#!/usr/bin/env python3
"""
Script to generate Git activity data for essays directory.
This script outputs JSON data showing commit activity over the past year.

Usage:
- Run this script from your web server directory
- Output can be saved to a JSON file that's loaded by the activity tracker

Example:
python3 get_essay_activity.py > essay_activity.json
"""

import json
import subprocess
import datetime
import sys
import os
import re
from collections import Counter

def get_git_commits(path='essays/', days=365):
    """Get git commit history for the specified path and time period."""
    activity = []
    
    # Calculate date range
    since_date = (datetime.datetime.now() - datetime.timedelta(days=days)).strftime('%Y-%m-%d')
    
    try:
        # Get git log data
        cmd = ['git', 'log', f'--since={since_date}', '--pretty=format:%ad', '--date=short', '--', path]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        # Count commits per day
        dates = result.stdout.strip().split('\n')
        commit_counts = Counter()
        
        if dates and dates[0]:  # Check if there's actual data
            commit_counts = Counter(dates)
                
        # Get modified essays for each day
        daily_essays = {}
        
        for date in commit_counts.keys():
            # Get files modified on this date
            files_cmd = [
                'git', 'log', '--date=short', '--name-only', 
                f'--pretty=format:%ad', f'--since={date} 00:00:00', 
                f'--until={date} 23:59:59', '--', path
            ]
            files_result = subprocess.run(files_cmd, capture_output=True, text=True, check=True)
            files_output = files_result.stdout.strip().split('\n')
            
            # Process files to get essay titles
            essays = []
            in_commit = False
            
            for line in files_output:
                if re.match(r'^\d{4}-\d{2}-\d{2}$', line):
                    # Date line indicates start of commit
                    in_commit = True
                    continue
                
                if in_commit and line and line.startswith(path):
                    # This is a file path in the essays directory
                    essay_path = line
                    
                    # Extract essay title
                    title = extract_essay_title(essay_path)
                    
                    if title and title not in essays:
                        essays.append(title)
            
            # Store essays for this day
            if essays:
                daily_essays[date] = essays
            
        # Create initial activity data with titles
        for date, count in commit_counts.items():
            item = {'date': date, 'count': count}
            
            # Add essays if available
            if date in daily_essays:
                item['essays'] = daily_essays[date]
                
            activity.append(item)
        
        # Fill in all dates in the range
        all_dates = {}
        start_date = datetime.datetime.strptime(since_date, '%Y-%m-%d')
        end_date = datetime.datetime.now()
        
        current_date = start_date
        while current_date <= end_date:
            date_str = current_date.strftime('%Y-%m-%d')
            all_dates[date_str] = {'date': date_str, 'count': 0}
            current_date += datetime.timedelta(days=1)
        
        # Merge with actual commits
        for item in activity:
            all_dates[item['date']] = item
        
        # Convert to list format
        result = list(all_dates.values())
        
        # Sort by date
        result.sort(key=lambda x: x['date'])
        
        return result
        
    except subprocess.CalledProcessError as e:
        return {'error': f'Git command failed: {e}'}
    except Exception as e:
        return {'error': f'An error occurred: {str(e)}'}

def extract_essay_title(filepath):
    """
    Extract an essay title from the file path or content
    
    Args:
        filepath: Path to the essay file
        
    Returns:
        str: Essay title or filename if title not found
    """
    # First try to extract from filename
    filename = os.path.basename(filepath)
    filename = re.sub(r'\.(html|md)$', '', filename)
    title = filename.replace('-', ' ').title()
    
    # If file exists, try to extract from content
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Try to find HTML title
                html_title_match = re.search(r'<title>([^<]+)</title>', content, re.IGNORECASE)
                if html_title_match:
                    return html_title_match.group(1)
                
                # Try to find H1
                h1_match = re.search(r'<h1>([^<]+)</h1>', content, re.IGNORECASE)
                if h1_match:
                    return h1_match.group(1)
                
                # Try to find markdown title
                md_title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                if md_title_match:
                    return md_title_match.group(1)
        except:
            pass  # If file can't be read, just use the filename
    
    return title

if __name__ == '__main__':
    data = get_git_commits()
    print(json.dumps(data, indent=2)) 