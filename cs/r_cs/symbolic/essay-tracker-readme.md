# Essay Activity Tracker

This is a visualization tool that tracks changes to essays and thoughts over time, similar to GitHub's activity contribution graph. It provides a visual representation of when and how frequently changes have been made to essays in the repository.

## How It Works

The activity tracker works by:

1. Fetching Git commit history for the essays directory
2. Processing the data to count commits per day
3. Rendering a visual heatmap with colored squares representing activity levels
4. Showing tooltips with date and commit count information on hover

## Implementation

The tracker has three main components:

1. **HTML/CSS**: The visual presentation layer in the website
2. **JavaScript**: The rendering engine that creates the visualization
3. **Backend Script**: Either PHP or Python script that fetches Git commit data

## Setup Instructions

### Option 1: PHP Implementation

1. Ensure the `get-essay-activity.php` file is in your web server's root directory
2. Make sure your web server has PHP enabled
3. The script requires shell_exec permissions to run Git commands

### Option 2: Python Implementation

1. Run the Python script to generate a static JSON file:
   ```bash
   python3 get_essay_activity.py > essay_activity.json
   ```
2. Modify the JavaScript to load from this JSON file instead of calling the PHP script

## Customization

You can customize the appearance of the activity tracker by modifying the CSS variables and classes in `styles.css`. The following elements can be customized:

- Square size and spacing
- Color palette for different activity levels
- Font sizes and spacing of labels
- Tooltip appearance and content

## Troubleshooting

If the activity tracker shows simulated data instead of real data:

1. Check that Git is installed and accessible to the web server user
2. Verify that the essays directory is part of a Git repository
3. Check server logs for any permission issues or errors
4. Try running the PHP/Python script directly to see any error messages

## Extending Functionality

Possible extensions to the activity tracker:

1. Add click functionality to show detailed commit information
2. Integrate with specific essay changes to show which essays were modified
3. Add filtering by essay category or type
4. Implement a time range selector to view different time periods

---

This component was built to enhance the personal website of Aadarsh Agarwal, providing a visual representation of thought evolution and essay development over time. 