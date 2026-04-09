import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Tooltip Component
const Tooltip = ({ date, count, x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        backgroundColor: '#151515',
        border: '1px solid #D4A574',
        padding: '8px 12px',
        borderRadius: 0,
        fontSize: '12px',
        color: '#E8E8E8',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'translate(-50%, -120%)',
        letterSpacing: '0.5px'
      }}
    >
      <div>{date}</div>
      <div style={{ color: '#D4A574', fontSize: '10px', marginTop: '4px' }}>
        {count} {count === 1 ? 'story' : 'stories'}
      </div>
    </motion.div>
  )
}

// Day cell with heatmap coloring
const DayCell = ({ day, date, storyCount, onMouseEnter, onMouseLeave, onClick }) => {
  // Heatmap color intensity (0 stories = #1a1a1a, 5+ stories = #D4A574)
  const getHeatmapColor = (count) => {
    if (count === 0) return '#1a1a1a'
    if (count === 1) return '#2a2a2a'
    if (count === 2) return '#3d3d2d'
    if (count === 3) return '#5a4f3a'
    if (count === 4) return '#8B6F47'
    return '#D4A574'
  }

  const bgColor = getHeatmapColor(storyCount)
  const isClickable = storyCount > 0

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.05 } : undefined}
      onClick={isClickable ? onClick : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: bgColor,
        border: '1px solid #2a2a2a',
        padding: '8px',
        minHeight: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'background-color 0.2s ease',
        position: 'relative',
        opacity: day === null ? 0.3 : 1
      }}
    >
      {day !== null && (
        <>
          <div style={{
            fontSize: '10px',
            color: '#999',
            fontWeight: 500
          }}>
            {day}
          </div>
          {storyCount > 0 && (
            <div style={{
              fontSize: '12px',
              fontWeight: 300,
              color: storyCount > 2 ? '#0F0F0F' : '#D4A574',
              letterSpacing: '-0.5px'
            }}>
              {storyCount}
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}

// Lightbox for day view
const DayLightbox = ({ date, stories, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '40px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#151515',
            border: '1px solid #2a2a2a',
            padding: '40px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'transparent',
              border: '1px solid #2a2a2a',
              color: '#E8E8E8',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#D4A574'
              e.target.style.color = '#D4A574'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#2a2a2a'
              e.target.style.color = '#E8E8E8'
            }}
          >
            ✕
          </button>

          {/* Date Title */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: 300,
            letterSpacing: '-0.5px',
            marginBottom: '30px',
            color: '#E8E8E8'
          }}>
            {date}
          </h2>

          {/* Stories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {stories.map((story, idx) => {
              const isVideo = story.thumb && (story.thumb.endsWith('.mp4') || story.thumb.endsWith('.mov') || story.thumb.endsWith('.webm'))
              const isImage = story.thumb && (story.thumb.endsWith('.jpg') || story.thumb.endsWith('.png') || story.thumb.endsWith('.jpeg'))
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    border: '1px solid #2a2a2a',
                    aspectRatio: '1',
                    overflow: 'hidden',
                    backgroundColor: '#0F0F0F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D4A574'
                    e.currentTarget.style.backgroundColor = '#1a1a1a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a'
                    e.currentTarget.style.backgroundColor = '#0F0F0F'
                  }}
                  onClick={() => {
                    if (isVideo) {
                      window.open(story.thumb, '_blank')
                    }
                  }}
                >
                  {isVideo && (
                    <>
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #2a2a2a 0%, #151515 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: 'rgba(212, 165, 116, 0.2)',
                          border: '2px solid #D4A574',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}>
                          ▶
                        </div>
                      </div>
                      {story.caption && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          padding: '8px',
                          fontSize: '10px',
                          color: '#E8E8E8',
                          maxHeight: '40%',
                          overflowY: 'auto',
                          borderTop: '1px solid #2a2a2a'
                        }}>
                          {story.caption}
                        </div>
                      )}
                    </>
                  )}
                  {isImage && (
                    <img
                      src={story.thumb}
                      alt="story"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  {!isVideo && !isImage && (
                    <div style={{
                      color: '#666',
                      fontSize: '11px',
                      textAlign: 'center',
                      padding: '10px'
                    }}>
                      {story.filename || 'Story ' + (idx + 1)}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {stories.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#999'
            }}>
              No stories found for this date
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Compact Month Calendar (single month)
const CompactMonthCalendar = ({ month, year, storyData, onDayClick, tooltipData }) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const days = []
  
  // Adjust firstDay to start with Monday (0) instead of Sunday (0)
  const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1
  
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null)
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return (
    <>
      {/* Weekday Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '6px',
        marginBottom: '8px'
      }}>
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              fontSize: '10px',
              color: '#666',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '4px 0'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '6px'
      }}>
        {days.map((day, idx) => {
          const date = day ? new Date(year, month, day) : null
          const dateKey = date ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null
          const dateData = dateKey ? storyData[dateKey] : null
          const count = dateData ? (dateData.count || 0) : 0

          return (
            <div key={idx} onMouseEnter={() => {
              if (day !== null && tooltipData) {
                const rect = event.currentTarget.getBoundingClientRect()
                tooltipData.show(date, count, rect.left + rect.width / 2, rect.top)
              }
            }}
            onMouseLeave={() => {
              if (tooltipData) tooltipData.hide()
            }}>
              <DayCell
                day={day}
                date={dateKey}
                storyCount={count}
                onClick={() => {
                  if (count > 0 && onDayClick) {
                    onDayClick(date, dateData)
                  }
                }}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default function CalendarHeatmap({ storyData = {} }) {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [selectedDayStories, setSelectedDayStories] = useState([])

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDayClick = (date, data) => {
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    console.log('Day clicked:', dateStr, 'Data:', data)
    setSelectedDate(dateStr)

    // Use actual stories from heatmap data
    const stories = (data && data.stories) ? data.stories : []
    console.log('Stories to display:', stories)
    setSelectedDayStories(stories)
  }

  const tooltipData = {
    show: (date, count, x, y) => {
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      setTooltip({ date: dateStr, count, x, y })
    },
    hide: () => setTooltip(null)
  }

  return (
    <div style={{
      backgroundColor: '#151515',
      border: '1px solid #2a2a2a',
      padding: '30px'
    }}>
      {/* Title and Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '12px',
            color: '#D4A574',
            fontWeight: 400,
            marginBottom: '8px'
          }}>
            Story Timeline
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '-0.5px',
            color: '#E8E8E8',
            marginBottom: '10px'
          }}>
            {monthNames[currentMonth]} {currentYear}
          </div>
          <p style={{
            fontSize: '12px',
            color: '#999',
            lineHeight: '1.5',
            letterSpacing: '0.5px',
            maxWidth: '400px'
          }}>
            Hotter days reveal your most prolific storytelling moments. The color intensity reflects your narrative momentum.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={goToPreviousMonth}
            style={{
              backgroundColor: '#0F0F0F',
              border: '1px solid #2a2a2a',
              color: '#E8E8E8',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#D4A574'
              e.target.style.color = '#D4A574'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#2a2a2a'
              e.target.style.color = '#E8E8E8'
            }}
          >
            ← Previous
          </button>
          <button
            onClick={goToNextMonth}
            style={{
              backgroundColor: '#0F0F0F',
              border: '1px solid #2a2a2a',
              color: '#E8E8E8',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#D4A574'
              e.target.style.color = '#D4A574'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#2a2a2a'
              e.target.style.color = '#E8E8E8'
            }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Compact Calendar */}
      <div style={{ marginBottom: '20px' }}>
        <CompactMonthCalendar
          month={currentMonth}
          year={currentYear}
          storyData={storyData}
          onDayClick={handleDayClick}
          tooltipData={tooltipData}
        />
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '16px',
        fontSize: '10px',
        color: '#999',
        paddingTop: '15px',
        borderTop: '1px solid #2a2a2a',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#1a1a1a', width: '12px', height: '12px', border: '1px solid #2a2a2a' }} />
          <span>0</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#2a2a2a', width: '12px', height: '12px', border: '1px solid #2a2a2a' }} />
          <span>1</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#5a4f3a', width: '12px', height: '12px', border: '1px solid #2a2a2a' }} />
          <span>2-3</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#8B6F47', width: '12px', height: '12px', border: '1px solid #2a2a2a' }} />
          <span>4</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#D4A574', width: '12px', height: '12px', border: '1px solid #2a2a2a' }} />
          <span>5+</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <Tooltip
          date={tooltip.date}
          count={tooltip.count}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}

      {/* Day Lightbox */}
      {selectedDate && (
        <DayLightbox
          date={selectedDate}
          stories={selectedDayStories}
          onClose={() => {
            setSelectedDate(null)
            setSelectedDayStories([])
          }}
        />
      )}
    </div>
  )
}

