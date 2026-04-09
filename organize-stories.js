#!/usr/bin/env node

/**
 * Story Organization Helper Script
 * 
 * This script helps organize your video files into the correct folder structure.
 * 
 * Usage:
 *   node organize-stories.js --source <path-to-videos> --dest ./stories
 * 
 * Example:
 *   node organize-stories.js --source "D:/Downloads/Instagram Stories" --dest ./stories
 */

const fs = require('fs')
const path = require('path')

function getDateFromVideo(filename, fileStats) {
  // Try to extract date from filename first
  const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    return {
      year: parseInt(dateMatch[1]),
      month: parseInt(dateMatch[2]),
      day: parseInt(dateMatch[3])
    }
  }

  // Try other common date formats
  const altMatch = filename.match(/(\d{4})(\d{2})(\d{2})/)
  if (altMatch) {
    return {
      year: parseInt(altMatch[1]),
      month: parseInt(altMatch[2]),
      day: parseInt(altMatch[3])
    }
  }

  // Fall back to file modification time
  const modTime = new Date(fileStats.mtime)
  return {
    year: modTime.getFullYear(),
    month: modTime.getMonth() + 1,
    day: modTime.getDate()
  }
}

function getMonthFolderName(year, month) {
  return `${year}${String(month).padStart(2, '0')}`
}

function renameWithDate(filename, date) {
  const ext = path.extname(filename)
  const base = path.basename(filename, ext)
  
  // Check if already has date
  if (filename.match(/\d{4}-\d{2}-\d{2}/)) {
    return filename
  }

  // Add date: story_YYYY-MM-DD_###.mp4
  const dateStr = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
  return `story_${dateStr}_001${ext}`
}

function organizeMockStories(destDir, monthCount = 12) {
  // For testing - creates mock story files
  const months = [
    '202504', '202505', '202506', '202507', '202508', '202509',
    '202510', '202511', '202512', '202601', '202602', '202603', '202604'
  ]

  months.slice(0, monthCount).forEach(month => {
    const monthPath = path.join(destDir, month)
    if (!fs.existsSync(monthPath)) {
      fs.mkdirSync(monthPath, { recursive: true })
    }

    // Create dummy files for demo
    for (let i = 0; i < Math.random() * 10; i++) {
      const filename = `story_sample_${i}.txt`
      fs.writeFileSync(path.join(monthPath, filename), `Demo story file`)
    }
  })

  console.log('✓ Created mock story structure in:', destDir)
}

// Parse command line arguments
const args = process.argv.slice(2)
const sourceIdx = args.indexOf('--source')
const destIdx = args.indexOf('--dest')
const mockIdx = args.indexOf('--create-mock')

const source = sourceIdx !== -1 ? args[sourceIdx + 1] : null
const dest = destIdx !== -1 ? args[destIdx + 1] : './stories'
const shouldCreateMock = mockIdx !== -1

if (shouldCreateMock) {
  organizeMockStories(dest)
} else if (source && fs.existsSync(source)) {
  console.log('Story Organizer')
  console.log('===============')
  console.log('Source:', source)
  console.log('Destination:', dest)
  console.log()
  console.log('This feature would organize your videos.')
  console.log('Full implementation would:')
  console.log('1. Scan all videos in source directory')
  console.log('2. Extract dates from filenames or modification times')
  console.log('3. Create YYYYMM folders')
  console.log('4. Move/copy videos to appropriate folders')
  console.log('5. Rename files to include dates')
} else {
  console.log('Story Organization Helper')
  console.log('=========================')
  console.log()
  console.log('Usage:')
  console.log('  node organize-stories.js --source <path> --dest ./stories')
  console.log('  node organize-stories.js --create-mock ./stories')
  console.log()
  console.log('Examples:')
  console.log('  node organize-stories.js --create-mock ./stories')
  console.log('  node organize-stories.js --source "D:/Videos" --dest ./stories')
}
