# 📅 Calendar Heatmap Setup Guide

## Overview

The **CalendarHeatmap** component displays a full 12-month calendar view of your Instagram stories with color intensity indicating how many stories you posted each day.

## What's New

### ✅ CalendarHeatmap Component Added

- `src/components/CalendarHeatmap.jsx` - 12-month calendar view
- `src/utils/storyAnalyzer.js` - Story scanning and heatmap generation
- Integration into main dashboard in `App.jsx`

### 🎨 Features

1. **12-Month Calendar View**
   - Full year displayed (Jan-Dec or Apr-Apr depending on your data)
   - Grid layout with Monday-Sunday columns
   - Week-based rows

2. **Heatmap Color Intensity**
   - **#1a1a1a** (darkest) = 0 stories
   - **#2a2a2a** = 1 story
   - **#3d3d2d** = 2 stories
   - **#5a4f3a** = 3 stories
   - **#8B6F47** = 4 stories
   - **#D4A574** (brightest gold) = 5+ stories

3. **Interactive Elements**
   - **Hover**: Shows tooltip with date and story count
   - **Click**: Opens lightbox showing all stories for that day
   - **Legend**: Color scale legend below the calendar

4. **Day Cell Information**
   - Day number (1-31)
   - Story count (visible for days with stories)
   - Responsive hover state

## Current Status: Demo Mode 📊

The calendar is currently showing **simulated data** for demonstration:

- ~150 random stories across 12 months
- Various story counts per day to show heatmap coloring
- No real video files required

This is perfect for:

- ✅ Testing the UI/UX
- ✅ Seeing heatmap behavior
- ✅ Understanding the system
- ✅ Design review

## To Use Your Real Stories 🎬

### Step 1: Create Folder Structure

```bash
# Navigate to project root
cd Insta-Personality

# Create stories folder
mkdir stories

# Create month subfolders (April 2025 - April 2026)
mkdir stories/202504
mkdir stories/202505
mkdir stories/202506
mkdir stories/202507
mkdir stories/202508
mkdir stories/202509
mkdir stories/202510
mkdir stories/202511
mkdir stories/202512
mkdir stories/202601
mkdir stories/202602
mkdir stories/202603
mkdir stories/202604
```

**Or create all at once:**

```bash
mkdir -p stories/{202504,202505,202506,202507,202508,202509,202510,202511,202512,202601,202602,202603,202604}
```

### Step 2: Organize Your Video Files

Move or copy your Instagram story videos into the appropriate month folders.

**Folder structure should look like:**

```
stories/
├── 202504/
│   ├── story_2025-04-01_001.mp4
│   ├── story_2025-04-03_001.mp4
│   ├── story_2025-04-15_001.mp4
│   └── ...
├── 202505/
│   ├── story_2025-05-02_001.mp4
│   └── ...
└── ... (rest of months)
```

### Step 3: File Naming Convention

**Files MUST include dates in YYYY-MM-DD format:**

✅ **Supported formats:**

- `story_2025-04-15_001.mp4` (recommended)
- `2025-04-15_vacation.mp4`
- `IMG_2025-04-15_123456.mp4`
- Any filename containing `YYYY-MM-DD` pattern

❌ **Not supported (will fall back to file mod time):**

- `story.mp4` (no date)
- `story_april_15.mp4` (date format not recognized)
- `vid_001.mp4` (no date)

### Step 4: Start Dashboard

```bash
npm run dev
```

Visit `http://localhost:3000/` and scroll down to **"Story Timeline Heatmap"**.

The calendar will automatically display your story distribution!

## Understanding the Heatmap

### What the Colors Mean

- **Dark cells (#1a1a1a)**: Days with no stories
- **Increasingly gold tones**: Days with more stories
- **Bright gold (#D4A574)**: Days with 5+ stories

### Example Interpretation

```
April 2025 Calendar:
- April 1: 1 story (light gray)
- April 5: 0 stories (very dark)
- April 15: 12 stories (bright gold)
- April 28: 4 stories (medium brown)

Visual pattern shows when you were most active posting stories.
```

## Troubleshooting

### Calendar shows demo data instead of my videos

**Cause**: Videos aren't found or organized correctly

**Fix**:

1. Check folder structure exists: `stories/` folder in project root
2. Verify month folders: `stories/202504/`, `stories/202505/`, etc.
3. Ensure videos have dates in filenames: `story_YYYY-MM-DD_###.mp4`
4. Check file extensions are `.mp4`, `.mov`, `.webm`, or `.m4v`

### My videos have different naming conventions

**Solution**: Rename them to include dates

```bash
# Example: If video is just "story.mp4" with mod time of April 15, 2025:
# Rename to: story_2025-04-15_001.mp4
```

The system tries to extract dates from:

1. Filename (priority)
2. File modification time (fallback)

### Calendar shows dates from wrong year/month

**Cause**: File modification times are incorrect

**Fix**:

- Rename files to include correct date in filename
- Or update file modification times:
  ```bash
  # Windows: touch command or use file properties
  # Mac/Linux: touch -d "2025-04-15" filename
  ```

## Advanced: Batch Renaming

If you have 100+ videos without dates in names, use a batch rename tool:

**Windows**:

- Bulk Rename Utility
- PowerShell Script
- Advanced Renamer

**Mac/Linux**:

```bash
# Example: Add date from modification time
# This would require a custom script based on your file organization
```

## What Happens Next

Once your videos are properly organized:

1. ✅ Calendar automatically detects videos in `stories/` folder
2. ✅ Extracts dates from filenames
3. ✅ Counts stories per day
4. ✅ Updates heatmap with color intensity
5. ✅ Shows tooltip with exact counts on hover
6. ✅ Opens lightbox when clicking a day (shows all stories from that day)

## Future Enhancements

Planned features:

- [ ] Video thumbnails in lightbox (frame extraction)
- [ ] Caption/metadata display
- [ ] Filter by date range
- [ ] Export heatmap as image
- [ ] Multi-year comparison
- [ ] Statistics (avg stories/day, peak days, etc.)
- [ ] Integration with Instagram API for direct import

## API Integration (Backend Setup)

For production, create a backend API to scan files:

```bash
# Backend would be a Node.js/Express server:
GET /api/stories -> Returns all videos in stories/ folder
GET /api/stories/:date -> Returns stories for specific date
```

See `src/hooks/useStoryHeatmap.js` for hook structure ready for API integration.

---

**Need Help?**

1. Check file organization: Does `stories/202504/` exist?
2. Check filenames: Do they include `YYYY-MM-DD`?
3. Check formats: Are they `.mp4`, `.mov`, etc.?
4. Try demo data: System falls back to generated data if no files found

**Pro Tip**: Start with a few videos in one month folder and verify it works before moving all your videos!
