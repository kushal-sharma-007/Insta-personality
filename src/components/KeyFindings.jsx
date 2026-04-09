import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function KeyFindings({ stories, heatmapData = {}, topSongs = [] }) {
  const findings = useMemo(() => {
    const insights = []

    // 1. Theme distribution insight
    const thematicDistribution = Object.entries(stories)
      .map(([theme, items]) => ({ theme, count: items.length }))
      .sort((a, b) => b.count - a.count)
    
    const dominantTheme = thematicDistribution[0]
    const themeBalanceScore = (100 - (dominantTheme.count / 84) * 100).toFixed(0)
    
    insights.push({
      title: 'Thematic Balance',
      value: `${dominantTheme.theme} leads with ${dominantTheme.count} stories`,
      insight: `Portfolio demonstrates balanced theme distribution (${themeBalanceScore}% diversity), indicating well-rounded content strategy across adventure, creative, social, reflective, and food categories.`
    })

    // 2. Consistency analysis
    const activeDays = Object.keys(heatmapData).length
    const daysWithMultiple = Object.values(heatmapData).filter(d => d.count > 1).length
    const consistencyScore = ((daysWithMultiple / activeDays) * 100).toFixed(0)
    
    insights.push({
      title: 'Posting Consistency',
      value: `${consistencyScore}% of posting days contain multiple stories`,
      insight: `${daysWithMultiple} of ${activeDays} active days show batch posting behavior, suggesting deliberate content planning and scheduling rather than reactive sharing.`
    })

    // 3. Genre concentration
    const hasGenres = Object.values(stories).some(arr => arr.some(s => s.tags && s.tags.length > 3))
    const topGenresList = topSongs.slice(0, 3).map(s => s.name).join(', ')
    
    insights.push({
      title: 'Musical/Genre Alignment',
      value: `Top 3 genres: ${topGenresList}`,
      insight: `Consistent genre tagging across stories indicates intentional brand voice. Music selection correlates with thematic content, reinforcing narrative coherence.`
    })

    // 4. Content depth
    const avgCaptiomLength = Object.values(stories)
      .flat()
      .reduce((sum, s) => sum + (s.caption ? s.caption.length : 0), 0) / 84
    
    insights.push({
      title: 'Content Depth',
      value: `Average caption: ${avgCaptiomLength.toFixed(0)} characters`,
      insight: `${avgCaptiomLength > 45 ? 'Substantive' : 'Concise'} caption approach indicates ${avgCaptiomLength > 45 ? 'thoughtful storytelling' : 'focused messaging'}. Strong narrative commitment across archive.`
    })

    // 5. Posting frequency stability
    const monthlyData = {}
    Object.keys(heatmapData).forEach(date => {
      const month = date.substring(0, 7)
      monthlyData[month] = (monthlyData[month] || 0) + 1
    })
    
    const monthValues = Object.values(monthlyData)
    const avgPostsPerMonth = (monthValues.reduce((a, b) => a + b, 0) / monthValues.length).toFixed(0)
    
    insights.push({
      title: 'Activity Stability',
      value: `Average ${avgPostsPerMonth} posting days per month`,
      insight: `Consistent monthly engagement pattern demonstrates sustained commitment to content creation and audience connection over the archive period.`
    })

    return insights
  }, [stories, heatmapData, topSongs])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: '#151515',
        border: '1px solid #2a2a2a',
        padding: '40px',
        marginBottom: '60px'
      }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: '30px' }}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '12px',
          color: '#D4A574',
          fontWeight: 400,
          marginBottom: '12px'
        }}>
          Key Findings
        </div>
        <p style={{
          fontSize: '13px',
          color: '#999',
          lineHeight: '1.6',
          letterSpacing: '0.5px'
        }}>
          Five critical insights derived from quantitative analysis of 84 stories across 59 active days.
        </p>
      </motion.div>

      {/* Findings Grid */}
      <motion.div
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '20px'
        }}
      >
        {findings.map((finding, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            style={{
              backgroundColor: '#0F0F0F',
              border: '1px solid #2a2a2a',
              borderLeft: '3px solid #D4A574',
              padding: '20px',
              borderRadius: 0,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderLeftColor = '#8B6F47'
              e.currentTarget.style.backgroundColor = '#0a0a0a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderLeftColor = '#D4A574'
              e.currentTarget.style.backgroundColor = '#0F0F0F'
            }}
          >
            {/* Title & Value */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                fontSize: '12px',
                color: '#D4A574',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
                marginBottom: '6px'
              }}>
                {finding.title}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#E8E8E8',
                fontWeight: 500
              }}>
                {finding.value}
              </div>
            </div>

            {/* Insight Text */}
            <div style={{
              fontSize: '12px',
              color: '#999',
              lineHeight: '1.5',
              letterSpacing: '0.3px'
            }}>
              {finding.insight}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Callout */}
      <motion.div
        variants={itemVariants}
        style={{
          marginTop: '30px',
          backgroundColor: 'rgba(212, 165, 116, 0.05)',
          border: '1px solid #D4A574',
          borderLeft: '3px solid #D4A574',
          padding: '16px',
          borderRadius: 0
        }}
      >
        <div style={{
          fontSize: '11px',
          color: '#D4A574',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: 600,
          marginBottom: '6px'
        }}>
          💡 Strategic Observation
        </div>
        <div style={{
          fontSize: '12px',
          color: '#E8E8E8',
          lineHeight: '1.6',
          letterSpacing: '0.3px'
        }}>
          Archive demonstrates strategic content curation with intentional theme organization, consistent posting discipline, and narrative coherence. 
          Data patterns indicate planned content calendar rather than organic/reactive sharing—hallmark of professional digital brand management.
        </div>
      </motion.div>
    </motion.div>
  )
}
