import React from 'react'

// Simple word cloud rendering
const WordCloud = ({ words }) => {
  const maxFreq = Math.max(...words.map(w => w.frequency))
  
  // Calculate font sizes based on frequency
  const getSize = (freq) => {
    const minSize = 12
    const maxSize = 32
    return minSize + ((freq / maxFreq) * (maxSize - minSize))
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      alignItems: 'flex-start',
      lineHeight: '1.8'
    }}>
      {words.map((item, idx) => (
        <span
          key={idx}
          style={{
            fontSize: `${getSize(item.frequency)}px`,
            color: '#D4A574',
            fontWeight: 300,
            letterSpacing: '-0.5px',
            opacity: 0.6 + (item.frequency / maxFreq) * 0.4,
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = 0.6 + (item.frequency / maxFreq) * 0.4}
        >
          {item.word}
        </span>
      ))}
    </div>
  )
}

export default function EmotionalYou({ words, sentiments, drivers }) {
  const sentimentArray = [
    { label: 'Positive', value: sentiments.positive, color: '#D4A574' },
    { label: 'Neutral', value: sentiments.neutral, color: '#8B6F47' },
    { label: 'Negative', value: sentiments.negative, color: '#2C3E50' }
  ]

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
        marginBottom: '30px',
        fontWeight: 400
      }}>
        Emotional You
      </div>

      {/* Word Cloud */}
      <div style={{ marginBottom: '50px' }}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '11px',
          color: '#666',
          marginBottom: '20px'
        }}>
          Word Echo
        </div>
        <WordCloud words={words} />
      </div>

      {/* Sentiment Breakdown */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '11px',
          color: '#666',
          marginBottom: '20px'
        }}>
          Sentiment Spectrum
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {sentimentArray.map((item, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '28px',
                fontWeight: 300,
                color: item.color,
                letterSpacing: '-0.5px'
              }}>
                {item.value}%
              </div>
              <div style={{
                fontSize: '12px',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '8px'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional Drivers */}
      <div style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #2a2a2a'
      }}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '11px',
          color: '#666',
          marginBottom: '14px'
        }}>
          What Drives You
        </div>
        <p style={{
          fontSize: '12px',
          color: '#999',
          lineHeight: '1.8',
          letterSpacing: '0.5px',
          marginBottom: '12px'
        }}>
          {drivers}
        </p>

        {/* Additional emotional context */}
        <div style={{
          backgroundColor: '#0F0F0F',
          border: '1px solid #2a2a2a',
          padding: '14px',
          marginTop: '16px'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#D4A574',
            fontWeight: 400,
            marginBottom: '8px'
          }}>
            Emotional Profile
          </div>
          <p style={{
            fontSize: '11px',
            color: '#999',
            lineHeight: '1.7',
            letterSpacing: '0.5px'
          }}>
            Your high positive sentiment ({sentiments.positive}%) indicates an optimistic worldview balanced with introspection. 
            The {sentiments.neutral}% neutral content reflects thoughtful observation rather than impulsivity. This pattern 
            suggests someone emotionally mature — capable of resilience without dismissing complexity.
          </p>
        </div>
      </div>
    </div>
  )
}
