import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function MusicalYou({ topSongs = [], genres = [] }) {
  const [expandedSong, setExpandedSong] = useState(null)

  const chartData = genres.map(g => ({
    name: g.name.split(' ')[0],
    value: g.percentage
  }))

  const getYouTubeSearchUrl = (songName) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`
  }

  return (
    <div style={{
      backgroundColor: '#151515',
      border: '1px solid #2a2a2a',
      padding: '40px'
    }}>
      {/* Title */}
      <div style={{
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '12px',
        color: '#D4A574',
        marginBottom: '12px',
        fontWeight: 400
      }}>
        Musical Landscape
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: '12px',
        color: '#999',
        marginBottom: '25px',
        lineHeight: '1.6',
        letterSpacing: '0.5px'
      }}>
        Your top genres define your sonic identity across {topSongs.reduce((sum, s) => sum + s.count, 0)} stories.
      </p>

      {/* Top Songs Section */}
      {topSongs.length > 0 && (
        <>
          <div style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '11px',
            color: '#D4A574',
            marginBottom: '16px',
            fontWeight: 500
          }}>
            Top 5 Genres/Vibes
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '30px' }}>
            {topSongs.map((song, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setExpandedSong(expandedSong === idx ? null : idx)}
                style={{
                  backgroundColor: '#0F0F0F',
                  border: '1px solid #2a2a2a',
                  padding: '14px 16px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4A574'
                  e.currentTarget.style.backgroundColor = '#1a1a1a'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 165, 116, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2a2a'
                  e.currentTarget.style.backgroundColor = '#0F0F0F'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: '#D4A574',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0F0F0F'
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '13px',
                      color: '#E8E8E8',
                      fontWeight: 500
                    }}>
                      {song.name}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#666',
                      marginTop: '2px'
                    }}>
                      Used in {song.count} {song.count === 1 ? 'story' : 'stories'}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '16px', color: '#D4A574' }}>
                  {expandedSong === idx ? '−' : '+'}
                </div>
              </motion.div>
            ))}
          </div>

          {/* YouTube Search Links */}
          <div style={{
            backgroundColor: '#0F0F0F',
            border: '1px solid #2a2a2a',
            padding: '16px',
            borderRadius: '2px',
            marginBottom: '25px'
          }}>
            <div style={{
              fontSize: '11px',
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '12px'
            }}>
              Explore on YouTube
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {topSongs.map((song, idx) => (
                <a
                  key={idx}
                  href={getYouTubeSearchUrl(song.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    padding: '8px 12px',
                    backgroundColor: '#151515',
                    border: '1px solid #D4A574',
                    color: '#D4A574',
                    fontSize: '11px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    borderRadius: '2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4A574'
                    e.currentTarget.style.color = '#0F0F0F'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#151515'
                    e.currentTarget.style.color = '#D4A574'
                  }}
                >
                  {song.name} ▶
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Genre Chart */}
      {chartData.length > 0 && (
        <>
          <div style={{ height: '200px', marginBottom: '30px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666"
                  style={{ fontSize: '11px' }}
                />
                <YAxis 
                  stroke="#666"
                  style={{ fontSize: '11px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#151515',
                    border: '1px solid #D4A574',
                    color: '#E8E8E8'
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar 
                  dataKey="value" 
                  fill="#D4A574"
                  isAnimationActive={true}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Musical Insight */}
          <div style={{
            fontSize: '11px',
            color: '#999',
            lineHeight: '1.6',
            letterSpacing: '0.5px',
            borderLeft: '2px solid #D4A574',
            paddingLeft: '14px',
            marginTop: '20px'
          }}>
            <span style={{ color: '#D4A574', fontWeight: 500 }}>Your Sound Profile:</span>
            {' '}These genres appear across your stories, revealing a curated taste that transcends trends. 
            You're drawn to music that amplifies emotion through authenticity.
          </div>
        </>
      )}
    </div>
  )
}
