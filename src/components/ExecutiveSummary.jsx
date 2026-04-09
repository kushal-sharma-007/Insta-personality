import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function ExecutiveSummary({ stories, heatmapData = {}, topSongs = [] }) {
  const summary = useMemo(() => {
    const totalStories = Object.values(stories).reduce((sum, s) => sum + s.length, 0)
    
    // Fix: Count distinct months, not dates
    const uniqueMonths = new Set(
      Object.keys(heatmapData).map(date => date.substring(0, 7))
    )
    const activeMonths = uniqueMonths.size
    
    // Count distinct days with stories
    const activeDays = Object.keys(heatmapData).length
    
    const themes = Object.keys(stories)
    const dominantTheme = themes.reduce((max, theme) => 
      stories[theme].length > stories[max].length ? theme : max
    )

    return {
      totalStories,
      activeMonths,
      activeDays,
      dominantTheme,
      topGenre: topSongs[0]?.name || 'N/A',
      averagePerDay: (totalStories / activeDays).toFixed(1)
    }
  }, [stories, heatmapData, topSongs])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const StatHighlight = ({ label, value, unit = '', icon = '■' }) => (
    <motion.div
      variants={itemVariants}
      style={{
        backgroundColor: 'rgba(212, 165, 116, 0.05)',
        border: '1px solid #D4A574',
        padding: '16px 20px',
        textAlign: 'center',
        borderRadius: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #D4A574, transparent)'
      }} />
      <div style={{
        fontSize: '11px',
        color: '#D4A574',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '8px',
        fontWeight: 600
      }}>
        {icon} {label}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: 300,
        color: '#E8E8E8',
        letterSpacing: '-0.5px'
      }}>
        {value}
        <span style={{ fontSize: '12px', color: '#999', marginLeft: '4px' }}>{unit}</span>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: 'linear-gradient(135deg, #151515 0%, #0F0F0F 100%)',
        border: '2px solid #D4A574',
        padding: '40px',
        marginBottom: '60px',
        borderRadius: 0,
        background: '#151515',
        borderTop: '3px solid #D4A574'
      }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: '30px' }}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '3px',
          fontSize: '13px',
          color: '#D4A574',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          📊 Executive Summary
        </div>
        <p style={{
          fontSize: '13px',
          color: '#999',
          lineHeight: '1.6',
          letterSpacing: '0.5px'
        }}>
          Quantified analysis of Instagram story archive spanning April 2025–April 2026. Metrics derived from 84 stories across five thematic categories with detailed metadata tracking.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          marginBottom: '30px'
        }}
      >
        <StatHighlight label="Total Stories" value={summary.totalStories} icon="📽️" />
        <StatHighlight label="Active Days" value={summary.activeDays} icon="📅" />
        <StatHighlight label="Stories/Day Avg" value={summary.averagePerDay} icon="📈" />
        <StatHighlight label="Dominant Theme" value={summary.dominantTheme.charAt(0).toUpperCase() + summary.dominantTheme.slice(1)} icon="🎯" />
      </motion.div>

      {/* Key Insight */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: '#0F0F0F',
          border: '1px solid #2a2a2a',
          borderLeft: '3px solid #D4A574',
          padding: '20px',
          borderRadius: 0
        }}
      >
        <div style={{
          fontSize: '12px',
          color: '#D4A574',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '8px',
          fontWeight: 600
        }}>
          💡 Key Insight
        </div>
        <p style={{
          fontSize: '13px',
          color: '#E8E8E8',
          lineHeight: '1.6',
          margin: 0
        }}>
          Across <span style={{ color: '#D4A574', fontWeight: 500 }}>{summary.activeDays} posting days</span> spanning {summary.activeMonths} month{summary.activeMonths !== 1 ? 's' : ''}, 
          your archive demonstrates a strong commitment to <span style={{ color: '#D4A574', fontWeight: 500 }}>{summary.dominantTheme}</span> content, 
          averaging <span style={{ color: '#D4A574', fontWeight: 500 }}>{summary.averagePerDay} stories per active day</span>.
        </p>
      </motion.div>
    </motion.div>
  )
}
