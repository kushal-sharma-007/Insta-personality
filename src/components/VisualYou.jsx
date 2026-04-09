import React from 'react'

export default function VisualYou({ colors, description }) {
  return (
    <div style={{
      backgroundColor: '#151515',
      border: '1px solid #2a2a2a',
      padding: '40px',
      minHeight: '100%'
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
        Visual You
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: '12px',
        color: '#999',
        marginBottom: '25px',
        lineHeight: '1.6',
        letterSpacing: '0.5px'
      }}>
        Your color palette is a fingerprint. This is what your visual language says about you:
      </p>

      {/* Color Squares Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {colors.map((color, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: color,
              aspectRatio: '1',
              border: '1px solid #2a2a2a',
              transition: 'opacity 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '10px'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
            title={color}
          >
            <div style={{
              fontSize: '11px',
              color: idx > 0 ? '#0F0F0F' : '#E8E8E8',
              fontWeight: 500,
              backgroundColor: idx > 0 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
              padding: '4px 8px',
              textAlign: 'center'
            }}>
              {color}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '13px',
        color: '#999',
        lineHeight: '1.8',
        letterSpacing: '0.5px'
      }}>
        {description}
      </p>

      {/* Color Psychology */}
      <div style={{
        marginTop: '30px',
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
          What This Reveals
        </div>
        <p style={{
          fontSize: '12px',
          color: '#999',
          lineHeight: '1.6',
          letterSpacing: '0.5px'
        }}>
          Consistent color choices demonstrate intentionality. You're not swayed by trends but drawn to tones that resonate 
          with your inner world. This suggests a person who knows themselves—someone with refined taste and an understanding 
          of how aesthetics influence emotion and perception.
        </p>
      </div>
    </div>
  )
}
