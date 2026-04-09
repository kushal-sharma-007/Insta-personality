/**
 * Real Story Loader
 * Loads actual story files from the stories/ folder
 * For use with a backend/Node server or during build process
 */

const fs = require('fs')
const path = require('path')

const STORIES_DIR = path.join(__dirname, '../../stories')
const SUPPORTED_FORMATS = ['.mp4', '.mov', '.webm', '.m4v', '.avi', '.mkv']

/**
 * Recursively read stories folder and build data structure
 */
function loadAllStories() {
  const storiesData = {}
  
  if (!fs.existsSync(STORIES_DIR)) {
    console.warn('Stories folder not found at:', STORIES_DIR)
    return storiesData
  }

  try {
    const monthFolders = fs.readdirSync(STORIES_DIR)

    monthFolders.forEach(monthFolder => {
      const monthPath = path.join(STORIES_DIR, monthFolder)
      const stats = fs.statSync(monthPath)

      if (!stats.isDirectory()) return

      // Validate month folder format (YYYYMM)
      if (!/^\d{6}$/.test(monthFolder)) return

      const files = fs.readdirSync(monthPath)
      const videoFiles = files.filter(f => 
        SUPPORTED_FORMATS.includes(path.extname(f).toLowerCase())
      )

      if (videoFiles.length > 0) {
        storiesData[monthFolder] = videoFiles.map(filename => {
          const filePath = path.join(monthPath, filename)
          const fileStats = fs.statSync(filePath)
          
          return {
            name: filename,
            path: `/stories/${monthFolder}/${filename}`,
            size: fileStats.size,
            modified: fileStats.mtime,
            date: extractDateFromModified(fileStats.mtime, monthFolder)
          }
        })
      }
    })
  } catch (error) {
    console.error('Error loading stories:', error)
  }

  return storiesData
}

/**
 * Extract date from file modification time
 * Fallback: use month folder to construct date as 1st of month
 */
function extractDateFromModified(modifiedTime, monthFolder) {
  const date = new Date(modifiedTime)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * Build heatmap from actual stories
 */
function buildHeatmapFromRealStories() {
  const storiesData = loadAllStories()
  const heatmap = {}

  Object.entries(storiesData).forEach(([monthFolder, stories]) => {
    if (!Array.isArray(stories)) return

    stories.forEach(story => {
      const date = story.date
      if (date && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        heatmap[date] = (heatmap[date] || 0) + 1
      }
    })
  })

  return { heatmap, storiesData }
}

module.exports = {
  loadAllStories,
  buildHeatmapFromRealStories,
  SUPPORTED_FORMATS
}
