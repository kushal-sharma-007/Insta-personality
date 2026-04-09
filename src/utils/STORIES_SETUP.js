/**
 * STORY ORGANIZATION GUIDE
 * 
 * Your Instagram stories should be organized in the following structure:
 * 
 * Insta-Personality/
 * ├── stories/
 * │   ├── 202504/          (April 2025)
 * │   │   ├── story_2025-04-01_001.mp4
 * │   │   ├── story_2025-04-01_002.mp4
 * │   │   ├── story_2025-04-15_001.mp4
 * │   │   └── ...
 * │   ├── 202505/          (May 2025)
 * │   │   └── ...
 * │   ├── 202506/          (June 2025)
 * │   │   └── ...
 * │   └── ... (up to 202604 for April 2026)
 * │
 * └── ... (other project files)
 * 
 * FOLDER NAMING: YYYYMM format (Year + Month)
 * - 202504 = 2025, April
 * - 202505 = 2025, May
 * - 202512 = 2025, December
 * - 202601 = 2026, January
 * - etc.
 * 
 * FILE NAMING: Recommended format
 * - story_YYYY-MM-DD_###.mp4
 * - story_2025-04-15_001.mp4
 * - story_2025-04-15_002.mp4
 * 
 * Alternative formats supported:
 * - YYYY-MM-DD_anything.mp4 (date will be extracted)
 * - IMG_YYYY-MM-DD_timestamp.mp4
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create the 'stories' folder in project root:
 *    mkdir stories
 * 
 * 2. Create month subfolders for your year of data:
 *    mkdir stories/202504
 *    mkdir stories/202505
 *    ... etc for all 12 months
 * 
 * 3. Move/copy your video files into the appropriate month folders,
 *    ensuring filenames include the date (YYYY-MM-DD format)
 * 
 * 4. If videos don't have dates in filenames, you can:
 *    a) Add dates to filenames manually
 *    b) Update the storyAnalyzer.js to use file modification times
 *    c) Create a metadata file mapping filenames to dates
 * 
 * DEMO MODE:
 * By default, the dashboard shows generated demo data (a full year of random
 * story patterns). Once you add real videos, the system will automatically
 * scan them and replace the demo data with your actual story timeline.
 * 
 * TO USE YOUR REAL DATA:
 * 1. Organize videos in stories/ folder as described above
 * 2. Update App.jsx to load real stories instead of demo data
 * 3. The CalendarHeatmap will automatically update to show your data
 */

export const STORIES_FOLDER_STRUCTURE = {
  root: 'stories',
  monthFolders: [
    '202504', '202505', '202506', '202507', '202508', '202509',
    '202510', '202511', '202512', '202601', '202602', '202603', '202604'
  ],
  fileFormat: 'story_YYYY-MM-DD_###.mp4',
  supportedFormats: ['.mp4', '.mov', '.webm', '.m4v']
}

export const DEMO_DATA_INFO = `
USING DEMO DATA
===============

The calendar is currently showing simulated data (a full year of random story patterns).
This is for demonstration and testing purposes.

Total demo stories: ~150 stories across the year
Average stories per day: ~0.4
Peak activity: Varies randomly to show heatmap behavior

When you have real videos in the stories/ folder organized correctly,
the system will automatically scan them and display actual data.
`
