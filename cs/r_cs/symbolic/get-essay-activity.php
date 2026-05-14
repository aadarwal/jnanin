<?php
header('Content-Type: application/json');
header('Cache-Control: max-age=3600'); // Cache for 1 hour

// Function to get git commits for a specific path over the last year
function getGitCommits($path = 'essays/') {
    $activity = array();
    
    // Get commits from the last 365 days
    $since = date('Y-m-d', strtotime('-365 days'));
    
    // Use git log to get commit data, format as JSON
    $cmd = "git log --since=\"$since\" --pretty=format:\"%ad\" --date=short -- $path";
    exec($cmd, $output, $returnVar);
    
    if ($returnVar !== 0) {
        // Error executing git command
        return array('error' => 'Failed to retrieve git history');
    }
    
    // Count commits per day
    $commitCounts = array_count_values($output);
    
    // Get modified essays for each day
    $dailyEssays = array();
    
    foreach ($commitCounts as $date => $count) {
        // Get files modified on this date
        $filesCmd = "git log --date=short --name-only --pretty=format:\"%ad\" --since=\"$date 00:00:00\" --until=\"$date 23:59:59\" -- $path";
        exec($filesCmd, $filesOutput, $filesReturnVar);
        
        if ($filesReturnVar !== 0) {
            continue; // Skip if command fails
        }
        
        // Process files to get essay titles
        $essays = array();
        $inCommit = false;
        
        foreach ($filesOutput as $line) {
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $line)) {
                // Date line indicates start of commit
                $inCommit = true;
                continue;
            }
            
            if ($inCommit && !empty($line) && strpos($line, $path) === 0) {
                // This is a file path in the essays directory
                $essayPath = $line;
                
                // Extract essay title from filename or file content
                $title = extractEssayTitle($essayPath);
                
                if ($title && !in_array($title, $essays)) {
                    $essays[] = $title;
                }
            }
        }
        
        // Store essays for this day
        if (!empty($essays)) {
            $dailyEssays[$date] = $essays;
        }
    }
    
    // Create activity data
    $activity = array();
    foreach ($commitCounts as $date => $count) {
        $item = array(
            'date' => $date,
            'count' => $count
        );
        
        // Add essays if available
        if (isset($dailyEssays[$date])) {
            $item['essays'] = $dailyEssays[$date];
        }
        
        $activity[] = $item;
    }
    
    // Fill in missing dates
    $end = new DateTime();
    $start = new DateTime($since);
    $interval = new DateInterval('P1D');
    $dateRange = new DatePeriod($start, $interval, $end);
    
    $allDates = array();
    foreach ($dateRange as $date) {
        $dateStr = $date->format('Y-m-d');
        $allDates[$dateStr] = array(
            'date' => $dateStr,
            'count' => 0
        );
    }
    
    // Merge with actual commits
    foreach ($activity as $item) {
        $allDates[$item['date']] = $item;
    }
    
    // Convert to array format
    $result = array_values($allDates);
    
    // Sort by date
    usort($result, function($a, $b) {
        return strcmp($a['date'], $b['date']);
    });
    
    return $result;
}

/**
 * Extracts an essay title from the file path or content
 * 
 * @param string $filepath Path to the essay file
 * @return string|null Essay title or null if not found
 */
function extractEssayTitle($filepath) {
    // First try to extract from filename
    $filename = basename($filepath);
    $filename = str_replace(array('.html', '.md'), '', $filename);
    $title = str_replace('-', ' ', $filename);
    $title = ucwords($title);
    
    // If file exists, try to extract from content
    if (file_exists($filepath)) {
        $content = file_get_contents($filepath);
        
        // Try to find HTML title
        if (preg_match('/<title>([^<]+)<\/title>/i', $content, $matches)) {
            return $matches[1];
        }
        
        // Try to find H1 
        if (preg_match('/<h1>([^<]+)<\/h1>/i', $content, $matches)) {
            return $matches[1];
        }
        
        // Try to find markdown title
        if (preg_match('/^# (.+)$/m', $content, $matches)) {
            return $matches[1];
        }
    }
    
    return $title;
}

// Check if this is a direct script access
try {
    $data = getGitCommits('essays/');
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?> 