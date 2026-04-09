import React from 'react'

export default function PersonalityCard({ data }) {
  return (
    <div style={{
      borderTop: '1px solid #D4A574',
      paddingTop: '40px',
      textAlign: 'center'
    }}>
      {/* Label */}
      <div style={{
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '12px',
        color: '#999',
        marginBottom: '30px',
        fontWeight: 400
      }}>
        Personal Data Analysis
      </div>

      {/* Main Title */}
      <h1 style={{
        fontSize: '48px',
        fontWeight: 300,
        letterSpacing: '-0.5px',
        color: '#E8E8E8',
        marginBottom: '20px'
      }}>
        {data.archetype}
      </h1>

      {/* Subtitle/Description */}
      <p style={{
        fontSize: '16px',
        color: '#999',
        fontStyle: 'italic',
        marginBottom: '30px',
        maxWidth: '700px',
        margin: '0 auto 30px'
      }}>
        {data.description}
      </p>

      {/* Traits */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        marginTop: '30px',
        marginBottom: '40px'
      }}>
        {data.traits.map((trait, idx) => (
          <span
            key={idx}
            style={{
              padding: '8px 16px',
              border: '1px solid #2a2a2a',
              backgroundColor: '#151515',
              color: '#E8E8E8',
              fontSize: '13px',
              letterSpacing: '0.5px',
              fontWeight: 400
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Additional insight */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#151515',
        border: '1px solid #2a2a2a'
      }}>
        <div style={{
          fontSize: '11px',
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '15px'
        }}>
          What This Means
        </div>
        <p style={{
          fontSize: '13px',
          color: '#999',
          lineHeight: '1.7',
          letterSpacing: '0.5px'
        }}>
          Your archetype represents a balance between creative expression and introspection. You're someone who doesn't just 
          consume experiences—you distill them into meaningful moments to share. Your authenticity is not performative; it's 
          the result of genuine reflection and intentional curation. This makes you magnetic to others seeking real connection 
          in an increasingly filtered world.
        </p>
      </div>
    </div>
  )
}
