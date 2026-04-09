import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Analytics({ stories, heatmapData = {} }) {
  const analytics = useMemo(() => {
    const stats = {
      totalStories: 0,
      themeBreakdown: {},
      topDates: {},
      genreFreq: {},
      monthlyData: {},
      postingFrequency: {
        daily: [],
        weekly: 0,
        monthly: 0
      }
    }

    // Process theme breakdown
    Object.keys(stories).forEach(theme => {
      stats.themeBreakdown[theme] = stories[theme].length
      stats.totalStories += stories[theme].length
    })

    // Process heatmap for posting patterns
    Object.entries(heatmapData).forEach(([date, data]) => {
      const month = date.substring(0, 7) // YYYY-MM
      stats.monthlyData[month] = (stats.monthlyData[month] || 0) + (data.count || 0)
      
      // Top dates
      if (data.count >= 2) {
        stats.topDates[date] = data.count
      }
    })

    // Sort and get top months for chart
    const monthlyArray = Object.entries(stats.monthlyData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        stories: count
      }))

    // Calculate frequency stats
    const totalDays = Object.keys(heatmapData).length
    stats.postingFrequency.daily = (stats.totalStories / totalDays).toFixed(1)
    stats.postingFrequency.weekly = Math.floor(stats.totalStories / 52)
    stats.postingFrequency.monthly = Math.floor(stats.totalStories / 12)

    return { stats, monthlyArray }
  }, [stories, heatmapData])

  const themeData = Object.entries(analytics.stats.themeBreakdown).map(([theme, count]) => ({
    name: theme.charAt(0).toUpperCase() + theme.slice(1),
    value: count
  }))

  const COLORS = ['#D4A574', '#8B6F47', '#5a4f3a', '#3d3d2d', '#2a2a2a']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const StatCard = ({ label, value, unit = '', color = '#D4A574' }) => (
    <motion.div
      variants={itemVariants}
      style={{
        backgroundColor: '#0F0F0F',
        border: '1px solid #2a2a2a',
        padding: '20px',
        textAlign: 'center',
        borderRadius: 0,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.backgroundColor = '#151515'
        e.currentTarget.style.boxShadow = `0 4px 12px rgba(212, 165, 116, 0.1)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2a2a2a'
        e.currentTarget.style.backgroundColor = '#0F0F0F'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        fontSize: '12px',
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '10px'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '32px',
        fontWeight: 300,
        color: color,
        letterSpacing: '-1px'
      }}>
        {value}
        <span style={{ fontSize: '14px', color: '#666', marginLeft: '4px' }}>{unit}</span>
      </div>
    </motion.div>
  )

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
      {/* Title */}
      <motion.div variants={itemVariants}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '12px',
          color: '#D4A574',
          marginBottom: '12px',
          fontWeight: 400
        }}>
          Story Analytics
        </div>
        <p style={{
          fontSize: '12px',
          color: '#999',
          marginBottom: '30px',
          lineHeight: '1.6',
          letterSpacing: '0.5px'
        }}>
          Quantified insights into your story archive and posting patterns.
        </p>
      </motion.div>

      {/* Key Stats Grid */}
      <motion.div
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}
      >
        <StatCard
          label="Total Stories"
          value={analytics.stats.totalStories}
          color="#D4A574"
        />
        <StatCard
          label="Days Posted"
          value={Object.keys(heatmapData).length}
          color="#8B6F47"
        />
        <StatCard
          label="Avg per Day"
          value={analytics.stats.postingFrequency.daily}
          color="#5a4f3a"
        />
        <StatCard
          label="Per Week Avg"
          value={analytics.stats.postingFrequency.weekly}
          color="#3d3d2d"
        />
      </motion.div>

      {/* Theme Breakdown */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}
      >
        {/* Pie Chart */}
        <div style={{
          backgroundColor: '#0F0F0F',
          border: '1px solid #2a2a2a',
          padding: '30px',
          borderRadius: 0
        }}>
          <div style={{
            fontSize: '11px',
            color: '#D4A574',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '15px'
          }}>
            Stories by Theme
          </div>
          {themeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={themeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {themeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F0F0F',
                    border: '1px solid #D4A574',
                    color: '#E8E8E8'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ color: '#666', textAlign: 'center', padding: '40px' }}>No theme data</div>
          )}
        </div>

        {/* Theme List */}
        <div style={{
          backgroundColor: '#0F0F0F',
          border: '1px solid #2a2a2a',
          padding: '30px',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#D4A574',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '15px'
          }}>
            Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {themeData.map((theme, idx) => (
              <div key={idx} style={{
                padding: '12px',
                backgroundColor: '#151515',
                border: '1px solid #2a2a2a',
                borderLeft: `3px solid ${COLORS[idx % COLORS.length]}`
              }}>
                <div style={{
                  fontSize: '11px',
                  color: '#999',
                  marginBottom: '4px'
                }}>
                  {theme.name}
                </div>
                <div style={{
                  fontSize: '18px',
                  color: COLORS[idx % COLORS.length],
                  fontWeight: 500
                }}>
                  {theme.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Monthly Trend */}
      {analytics.monthlyArray.length > 0 && (
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: '#0F0F0F',
            border: '1px solid #2a2a2a',
            padding: '30px',
            borderRadius: 0
          }}
        >
          <div style={{
            fontSize: '11px',
            color: '#D4A574',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '20px'
          }}>
            Monthly Posting Trend
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.monthlyArray}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="month" stroke="#666" style={{ fontSize: '11px' }} />
              <YAxis stroke="#666" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151515',
                  border: '1px solid #D4A574',
                  color: '#E8E8E8'
                }}
              />
              <Line
                type="monotone"
                dataKey="stories"
                stroke="#D4A574"
                dot={{ fill: '#D4A574', r: 4 }}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </motion.div>
  )
}
