# Instagram Stories Personality Analysis Dashboard

A sophisticated React + Vite dashboard that analyzes Instagram stories to create personality profiles with a dark, minimalist aesthetic inspired by Patrick Bateman's obsessive attention to detail.

## 📍 Story Files Location

Your Instagram stories should be organized in:

```
Insta-Personality/
├── stories/
│   ├── 202504/  (April 2025)
│   │   ├── story_2025-04-01_001.mp4
│   │   ├── story_2025-04-15_002.mp4
│   │   └── ...
│   ├── 202505/  (May 2025)
│   ├── 202506/  (June 2025)
│   ├── 202507/  (July 2025)
│   ├── 202508/  (August 2025)
│   ├── 202509/  (September 2025)
│   ├── 202510/  (October 2025)
│   ├── 202511/  (November 2025)
│   ├── 202512/  (December 2025)
│   ├── 202601/  (January 2026)
│   ├── 202602/  (February 2026)
│   ├── 202603/  (March 2026)
│   └── 202604/  (April 2026)
└── ... other project files
```

### Quick Setup

```bash
# Create stories folder structure
mkdir stories
mkdir stories/202504 stories/202505 stories/202506 stories/202507
mkdir stories/202508 stories/202509 stories/202510 stories/202511
mkdir stories/202512 stories/202601 stories/202602 stories/202603 stories/202604

# Optional: Create mock story structure for testing
node organize-stories.js --create-mock ./stories
```

### File Naming Convention

Files should include dates in `YYYY-MM-DD` format:

**Recommended format:**

```
story_2025-04-15_001.mp4
story_2025-04-15_002.mp4
story_2025-04-15_003.mp4
```

**Alternative formats supported:**

- `2025-04-15_snapshot.mp4`
- `IMG_2025-04-15_123456.mov`
- Any filename with `YYYY-MM-DD` pattern

If videos don't have dates, the system falls back to file modification time.

## Project Setup ✓

### Installation Complete

✅ React 18 + Vite  
✅ Tailwind CSS (configured with custom design system)  
✅ Framer Motion (animations)  
✅ Recharts (data visualization)  
✅ Piexifjs (metadata extraction)  
✅ Axios (HTTP requests)

### Design System

**Colors:**

- Background: `#0F0F0F` (deep charcoal)
- Card Background: `#151515`
- Text: `#E8E8E8` (off-white)
- Accents:
  - `#D4A574` (warm gold)
  - `#8B6F47` (muted brown)
  - `#2C3E50` (deep blue)
- Borders: `1px solid #2a2a2a`

**Typography:**

- Font: System sans-serif
- Light weight (300) for headings
- Careful letter-spacing for sophistication
- NO rounded corners
- NO gradients or shadows

### Project Structure

```
src/
├── components/
│   ├── PersonalityCard.jsx          # Hero section with archetype
│   ├── VisualYou.jsx                # 4 color squares + description
│   ├── MusicalYou.jsx               # Genre bars + artists
│   ├── EmotionalYou.jsx             # Word cloud + sentiment
│   ├── InterestConstellation.jsx    # Interest pills
│   ├── StoryGallery.jsx             # Grouped stories with lightbox
│   └── CalendarHeatmap.jsx          # 12-month story timeline ⭐ NEW
├── pages/
├── utils/
│   ├── storyAnalyzer.js             # Story scanning & heatmap generation
│   └── STORIES_SETUP.js             # Setup guide & configuration
├── styles/
│   └── index.css                    # Tailwind + custom styles
├── App.jsx                          # Main layout
└── main.jsx                         # Entry point

public/                              # Static assets
organize-stories.js                  # Helper script for file organization ⭐ NEW
```

## Running the Project

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📊 Components Overview

### 1. **PersonalityCard** (Hero Section)

- Large, light-weight typography
- "Personal Data Analysis" label in caps
- Archetype title with description
- Trait pills

### 2. **VisualYou**

- 4 colored squares displaying dominant colors
- Aesthetic description
- Hover effects for interactivity

### 3. **MusicalYou**

- Horizontal bar chart (Recharts) of top 3 genres
- Artist names list
- Story vibe alignment percentage

### 4. **EmotionalYou**

- Word cloud (20 most common words, scaled by frequency)
- Sentiment breakdown (positive/neutral/negative %)
- Emotional drivers insights

### 5. **InterestConstellation**

- 6 main interests in bordered boxes
- Percentage alignment
- Hover state with gold border

### 6. **StoryGallery**

- 5 theme categories (adventure, creative, social, reflective, food)
- 3-column thumbnail grids per category
- Lightbox modal with Framer Motion animations
- Large image + caption + tags display

### 7. **CalendarHeatmap** ⭐ NEW

- **12-month calendar view** of all stories
- **Heatmap intensity coloring:**
  - `#1a1a1a` = 0 stories (dark)
  - `#2a2a2a` = 1 story
  - `#3d3d2d` = 2 stories
  - `#5a4f3a` = 3 stories
  - `#8B6F47` = 4 stories
  - `#D4A574` = 5+ stories (brightest gold)
- **Interactive features:**
  - Hover shows tooltip with date + story count
  - Click a day to open lightbox showing all stories from that day
  - Grid displays all 12 months for the year
  - Week-based layout (Monday-Sunday columns)
  - Legend showing heatmap intensity scale

**Demo Data:** Currently shows simulated data (random story patterns). Replace with real data by organizing videos in `stories/` folder.

## 🎯 How It Works

### Story Timeline Generation

1. **Scan**: System scans `stories/` folder and subfolders (202504, 202505, etc.)
2. **Parse**: Extracts dates from filenames (YYYY-MM-DD format)
3. **Count**: Tallies stories per day
4. **Heatmap**: Generates color intensity based on story count
5. **Display**: Renders 12-month calendar with all data

### Using Demo Data vs Real Data

**Default (Demo Mode):**

- Shows generated heatmap with ~150 random stories
- Useful for testing and UI/UX validation
- No video files needed

**Real Data:**

1. Organize videos in `stories/` with date-based filenames
2. System automatically detects and scans them
3. Calendar updates with actual story timeline
4. Each day cell shows real story count

## 📝 Next Steps

1. **Organize Your Videos**

   ```bash
   # Create folder structure
   mkdir -p stories/{202504,202505,202506,202507,202508,202509,202510,202511,202512,202601,202602,202603,202604}

   # Move/copy your video files into appropriate month folders
   # Ensure filenames include dates: story_YYYY-MM-DD_###.mp4
   ```

2. **Update App Data** (when ready to use real videos)
   - Import actual story files into the dashboard
   - Update `heatmapData` state to load from file system
   - System will automatically display your story timeline

3. **Advanced Features** Down the Road
   - Extract frames from videos for thumbnails
   - Analyze color palettes from videos
   - Sentiment analysis of captions
   - Generate music/genre associations
   - PDF personality report export

## 🛠️ Configuration

Edit these files to customize:

- **Colors/Branding**: `tailwind.config.js`, `src/styles/index.css`
- **Story Organization Rules**: `src/utils/storyAnalyzer.js`
- **Heatmap Colors**: `src/components/CalendarHeatmap.jsx`
- **Demo Data Generation**: `src/utils/storyAnalyzer.js` → `generateDemoData()`

## 📚 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.2",
  "recharts": "^2.10.3",
  "framer-motion": "^10.16.4",
  "piexifjs": "^1.0.6",
  "tailwindcss": "^3.3.5"
}
```

## 🎨 Development Notes

- All styling uses inline styles + Tailwind for precise control
- No rounded corners per design spec
- Zero shadows or gradients
- Monochromatic with strategic gold accent usage
- Grid-based layouts for obsessive organization
- All text uses precise letter-spacing
- Framer Motion for smooth, precise animations

## 📊 Demo Data Information

Currently showing generated demo data:

- **Timespan**: Full year (April 2025 - April 2026)
- **Total Stories**: ~150 randomly distributed
- **Average**: ~0.4 stories per day
- **Peak Days**: Vary to demonstrate heatmap coloring

To switch to real data:

1. Organize videos in `stories/` folder
2. Update import in `App.jsx` from `generateDemoData()` to `buildStoryHeatmapData(realStoriesData)`
3. Dashboard updates automatically

---

**Status**: Project setup complete with interactive calendar heatmap. Ready for video integration.
