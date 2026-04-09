/**
 * Hook to load stories from the file system
 * 
 * In a real application, this would either:
 * 1. Call a backend API that scans the stories folder
 * 2. Use Electron or similar for direct file system access
 * 3. Accept pre-scanned file lists
 * 
 * For now, this provides a structure for when you add backend integration
 */

import { useState, useEffect } from 'react'
import { buildStoryHeatmapData, generateDemoData } from '../utils/storyAnalyzer'

export const useStoryHeatmap = (useDemoData = true) => {
  const [heatmapData, setHeatmapData] = useState(null)
  const [loading, setLoading] = useState(!useDemoData)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (useDemoData) {
      // Use demo data for testing
      setHeatmapData(generateDemoData())
      return
    }

    // In a real app, you would:
    // 1. Call an API endpoint: /api/stories
    // 2. API scans the stories folder
    // 3. Returns structured data with dates and file info
    // 4. Parse and build heatmap

    const loadStories = async () => {
      try {
        // Mock API call structure
        // const response = await fetch('/api/stories')
        // const storiesData = await response.json()
        // const heatmap = await buildStoryHeatmapData(storiesData)
        // setHeatmapData(heatmap)

        // For now, use demo data
        setHeatmapData(generateDemoData())
      } catch (err) {
        setError(err.message)
        // Fallback to demo data on error
        setHeatmapData(generateDemoData())
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [useDemoData])

  return { heatmapData, loading, error }
}

/**
 * Backend API Structure (example for Node.js/Express)
 * 
 * // Pseudocode
 * 
 * app.get('/api/stories', async (req, res) => {
 *   const storiesDir = path.join(__dirname, '../stories')
 *   const storiesData = {}
 * 
 *   // Read all month folders
 *   const months = fs.readdirSync(storiesDir)
 * 
 *   for (const month of months) {
 *     const monthPath = path.join(storiesDir, month)
 *     const files = fs.readdirSync(monthPath)
 * 
 *     storiesData[month] = files
 *       .filter(f => SUPPORTED_FORMATS.includes(path.extname(f)))
 *       .map(filename => {
 *         const filePath = path.join(monthPath, filename)
 *         const stats = fs.statSync(filePath)
 *         return {
 *           name: filename,
 *           date: extractDateFromFilename(filename),
 *           size: stats.size,
 *           modified: stats.mtime
 *         }
 *       })
 *   }
 * 
 *   res.json(storiesData)
 * })
 */

export default useStoryHeatmap
