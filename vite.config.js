import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const loadStoriesAPI = {
  name: 'load-stories-api',
  configureServer(server) {
    return () => {
      // Serve static story files (videos, images, etc.) from root stories directory
      server.middlewares.use('/stories/', (req, res, next) => {
        const filePath = path.join(process.cwd(), 'stories', req.url)
        
        try {
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const content = fs.readFileSync(filePath)
            // Set appropriate content-type based on file extension
            const ext = path.extname(filePath).toLowerCase()
            const mimeTypes = {
              '.mp4': 'video/mp4',
              '.webm': 'video/webm',
              '.mov': 'video/quicktime',
              '.m4v': 'video/x-m4v',
              '.avi': 'video/x-msvideo',
              '.mkv': 'video/x-matroska',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png'
            }
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
            res.end(content)
            return
          }
        } catch (error) {
          console.error('Error serving story file:', error)
        }
        next()
      })

      // API endpoint for stories metadata
      server.middlewares.use('/api/stories', (req, res) => {
        try {
          const storiesDir = path.join(process.cwd(), 'stories')
          const storiesData = {}

          if (!fs.existsSync(storiesDir)) {
            res.end(JSON.stringify({ storiesData: {}, error: 'Stories folder not found' }))
            return
          }

          const monthFolders = fs.readdirSync(storiesDir)
          monthFolders.forEach(monthFolder => {
            const monthPath = path.join(storiesDir, monthFolder)
            const stats = fs.statSync(monthPath)

            if (!stats.isDirectory()) return
            if (!/^\d{6}$/.test(monthFolder)) return

            const files = fs.readdirSync(monthPath)
            const videoFiles = files.filter(f => {
              const ext = path.extname(f).toLowerCase()
              return ['.mp4', '.mov', '.webm', '.m4v', '.avi', '.mkv'].includes(ext)
            })

            if (videoFiles.length > 0) {
              storiesData[monthFolder] = videoFiles.map(filename => {
                const filePath = path.join(monthPath, filename)
                const fileStats = fs.statSync(filePath)
                const modTime = new Date(fileStats.mtime)
                
                // Extract date from file modification time
                const year = modTime.getFullYear()
                const month = String(modTime.getMonth() + 1).padStart(2, '0')
                const day = String(modTime.getDate()).padStart(2, '0')

                return {
                  name: filename,
                  path: `/stories/${monthFolder}/${filename}`,
                  size: fileStats.size,
                  date: `${year}-${month}-${day}`
                }
              })
            }
          })

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ storiesData }))
        } catch (error) {
          console.error('Error loading stories:', error)
          res.statusCode = 500
          res.end(JSON.stringify({ error: error.message }))
        }
      })
    }
  }
}

export default defineConfig({
  base: '/Insta-personality/',
  plugins: [react(), loadStoriesAPI],
  server: {
    port: 3000,
    open: true,
    middlewareMode: false
  }
})
