import React from 'react'

export default function InterestConstellation({ interests }) {
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
        Interest Constellation
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: '12px',
        color: '#999',
        marginBottom: '25px',
        lineHeight: '1.6',
        letterSpacing: '0.5px'
      }}>
        The landscape of your attention reveals the priorities of your consciousness. These are the threads that weave your narrative.
      </p>

      {/* Interest Pills Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {interests.map((interest, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #2a2a2a',
              padding: '20px',
              backgroundColor: '#0F0F0F',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '120px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4A574'
              e.currentTarget.style.backgroundColor = '#1a1a1a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2a2a2a'
              e.currentTarget.style.backgroundColor = '#0F0F0F'
            }}
          >
            <div style={{
              fontSize: '14px',
              color: '#E8E8E8',
              textAlign: 'center',
              marginBottom: '8px',
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}>
              {interest.name}
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 300,
              color: '#D4A574',
              letterSpacing: '-0.5px'
            }}>
              {interest.percentage}%
            </div>
          </div>
        ))}
      </div>

      {/* Interest Interpretation */}
      <div style={{
        paddingTop: '20px',
        borderTop: '1px solid #2a2a2a'
      }}>
        <div style={{
          fontSize: '11px',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '12px'
        }}>
          Pattern Recognition
        </div>
        <p style={{
          fontSize: '12px',
          color: '#999',
          lineHeight: '1.7',
          letterSpacing: '0.5px'
        }}>
          Your constellation shows a balanced tension between exploration and creation. Photography and travel dominate 
          because you're someone who collects experiences and transforms them into visual language. Fashion and wellness 
          suggest meticulous self-curation — you're intentional about how you present to the world.
        </p>
        <p style={{
          fontSize: '12px',
          color: '#999',
          lineHeight: '1.7',
          letterSpacing: '0.5px',
          marginTop: '12px'
        }}>
          The presence of music and food indicates sensory depth. You don't just consume — you absorb. This suggests someone 
          with developed taste, who understands that personality is built from a thousand small aesthetic choices accumulated 
          over time.
        </p>
      </div>
    </div>
  )
}
