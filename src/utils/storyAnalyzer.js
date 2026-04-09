/**
 * Utility to scan story videos and generate heatmap data
 * 
 * Expected directory structure:
 * stories/
 *   202504/  (April 2025)
 *     story_2025-04-15_001.mp4
 *     story_2025-04-15_002.mp4
 *   202505/  (May 2025)
 *     ...
 */

/**
 * Parse month folder name (YYYYMM format)
 * @param {string} folderName - e.g., "202504"
 * @returns {{year: number, month: number}}
 */
export const parseMonthFolder = (folderName) => {
  const match = folderName.match(/^(\d{4})(\d{2})$/)
  if (!match) return null
  return {
    year: parseInt(match[1]),
    month: parseInt(match[2])
  }
}

/**
 * Extract date from video filename
 * Supports formats like:
 * - 2025-04-15_story.mp4
 * - story_2025-04-15_001.mp4
 * - IMG_2025-04-15_123456.mp4
 * - If date can't be extracted, uses filename modification time
 */
export const extractDateFromFilename = (filename) => {
  // Try to match YYYY-MM-DD pattern
  const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    return `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
  }
  return null
}

/**
 * Build heatmap data from stories
 * Returns object with date keys (YYYY-MM-DD) and story counts
 */
export const buildStoryHeatmapData = async (storiesData) => {
  const heatmap = {}

  // storiesData format:
  // {
  //   "202504": [
  //     { name: "story1.mp4", date: "2025-04-15" },
  //     { name: "story2.mp4", date: "2025-04-15" },
  //     ...
  //   ],
  //   "202505": [ ... ]
  // }

  if (!storiesData || Object.keys(storiesData).length === 0) {
    // Return demo data if no real data provided
    return generateDemoData()
  }

  Object.entries(storiesData).forEach(([monthFolder, stories]) => {
    const parsed = parseMonthFolder(monthFolder)
    if (!parsed) return

    stories.forEach(story => {
      let dateStr = story.date

      // If no date in story object, extract from filename
      if (!dateStr) {
        dateStr = extractDateFromFilename(story.name)
      }

      // Construct full date string
      if (dateStr && dateStr.length === 10) {
        // Already in YYYY-MM-DD format
        heatmap[dateStr] = (heatmap[dateStr] || 0) + 1
      } else if (parsed.year && parsed.month) {
        // Use month/year with day 1 as fallback
        const day = dateStr ? parseInt(dateStr.split('-')[2]) : 1
        const fullDate = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        heatmap[fullDate] = (heatmap[fullDate] || 0) + 1
      }
    })
  })

  return Object.keys(heatmap).length > 0 ? heatmap : generateDemoData()
}

/**
 * Generate demo heatmap data for testing
 * Simulates a year of stories with varied frequency
 */
export const generateDemoData = () => {
  const data = {}
  const now = new Date()
  const startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1)

  // Generate 365 days of data
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Random story counts: 60% no stories, 20% 1-2, 15% 3-4, 5% 5+
    const rand = Math.random()
    let count = 0
    if (rand < 0.6) {
      count = 0
    } else if (rand < 0.8) {
      count = Math.floor(Math.random() * 2) + 1
    } else if (rand < 0.95) {
      count = Math.floor(Math.random() * 2) + 3
    } else {
      count = Math.floor(Math.random() * 5) + 5
    }

    if (count > 0) {
      const dateStr = date.toISOString().split('T')[0]
      data[dateStr] = count
    }
  }

  return data
}

/**
 * Get all stories for a specific date
 * @param {Date} date
 * @param {Object} storiesData - Raw stories data by month folder
 * @returns {Array} Stories for that date
 */
export const getStoriesForDate = (date, storiesData) => {
  const dateStr = date.toISOString().split('T')[0]
  const [year, month, day] = dateStr.split('-')
  const monthFolder = `${year}${month}`

  const stories = storiesData[monthFolder] || []
  return stories.filter(story => {
    const storyDate = story.date || extractDateFromFilename(story.name)
    return storyDate === dateStr
  })
}

/**
 * Count total stories across all data
 */
export const countTotalStories = (heatmapData) => {
  return Object.values(heatmapData).reduce((sum, count) => sum + count, 0)
}

/**
 * Get statistics about story distribution
 */
export const getStoryStats = (heatmapData) => {
  const counts = Object.values(heatmapData)
  
  return {
    total: counts.reduce((a, b) => a + b, 0),
    days: counts.length,
    average: Math.round(counts.reduce((a, b) => a + b, 0) / counts.length),
    max: Math.max(...counts),
    min: Math.min(...counts),
    median: counts.sort((a, b) => a - b)[Math.floor(counts.length / 2)]
  }
}
