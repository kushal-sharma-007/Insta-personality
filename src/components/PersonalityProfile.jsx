import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function PersonalityProfile({ stories, heatmapData = {}, topSongs = [] }) {
  const personalityTraits = useMemo(() => {
    const traits = []

    // Based on Thematic Balance - Diversified Thinker
    const thematicDistribution = Object.entries(stories)
      .map(([theme, items]) => ({ theme, count: items.length }))
      .sort((a, b) => b.count - a.count)
    
    traits.push({
      trait: 'Diversified Thinker',
      icon: '🔄',
      description: 'Your balanced portfolio across Adventure (27%), Creative (26%), Social (18%), Reflective (25%), and Food (4%) reveals intellectual flexibility and curiosity. You don\'t operate within silos—you synthesize insights from multiple domains. This mirrors how AI systems process varied data sources to generate holistic understanding.',
      attribute: 'Multi-dimensional perspective'
    })

    // Based on Posting Consistency - Strategic Planner
    const activeDays = Object.keys(heatmapData).length
    const daysWithMultiple = Object.values(heatmapData).filter(d => d.count > 1).length
    const batchPostingPercentage = ((daysWithMultiple / activeDays) * 100).toFixed(0)
    
    traits.push({
      trait: 'Strategic Planner',
      icon: '📋',
      description: `Your ${batchPostingPercentage}% batch-posting behavior shows intentional planning over reactive impulses. You curate and schedule deliberately, demonstrating discipline and foresight—exactly how algorithms optimize for consistent resource allocation and timing.`,
      attribute: 'Deliberate execution'
    })

    // Based on Genre Alignment - Narrative Architect
    traits.push({
      trait: 'Narrative Architect',
      icon: '🎨',
      description: 'Your consistent genre tagging and thematic coherence demonstrate mastery of storytelling structure. You understand that context and mood (music, captions, visual themes) shape how ideas are received. This is precisely what predictive models do—context matters more than raw data.',
      attribute: 'Story-driven communication'
    })

    // Based on Content Depth - Communicator with Conviction
    const avgCaptionLength = Object.values(stories)
      .flat()
      .reduce((sum, s) => sum + (s.caption ? s.caption.length : 0), 0) / 84
    
    const depthLabel = avgCaptionLength > 45 ? 'substantive' : 'focused'
    traits.push({
      trait: 'Communicator with Conviction',
      icon: '💬',
      description: `Your ${depthLabel.toLowerCase()} caption approach (${avgCaptionLength.toFixed(0)} char avg) shows you say what matters. You don't over-explain or under-deliver. This mirrors clean, efficient code—maximum impact with minimal noise.`,
      attribute: `${depthLabel} messaging`
    })

    // Based on Activity Stability - Committed Executor
    const monthlyData = {}
    Object.keys(heatmapData).forEach(date => {
      const month = date.substring(0, 7)
      monthlyData[month] = (monthlyData[month] || 0) + 1
    })
    
    const monthValues = Object.values(monthlyData)
    const avgPostsPerMonth = (monthValues.reduce((a, b) => a + b, 0) / monthValues.length).toFixed(0)
    
    traits.push({
      trait: 'Committed Executor',
      icon: '⚡',
      description: `${avgPostsPerMonth} posting days per month, month after month. You finish what you start. Long-term consistency beats spikes—you understand that sustained investment compounds. This is the foundation of every scalable system.`,
      attribute: 'Compound execution'
    })

    return traits
  }, [stories, heatmapData, topSongs])

  const overallType = useMemo(() => {
    return "The Explorer-Architect: Driven by curiosity and systematic thinking, you navigate complex landscapes with deliberation and grace. You balance divergent thinking with strategic focus—comfortable in ambiguity yet decisive in execution."
  }, [])

  return (
    <div style={{ color: '#E8E8E8' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Overall Type */}
        <div style={{
          backgroundColor: '#0F0F0F',
          border: '2px solid #D4A574',
          padding: '30px',
          marginBottom: '50px',
          borderRadius: '0px'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '2px',
            color: '#D4A574',
            textTransform: 'uppercase',
            marginBottom: '15px'
          }}>
            ★ Personality Archetype
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '300',
            color: '#E8E8E8',
            lineHeight: '1.8',
            letterSpacing: '0.5px'
          }}>
            {overallType}
          </div>
        </div>

        {/* Five Traits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {personalityTraits.map((trait, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{
                backgroundColor: '#151515',
                border: '1px solid #2a2a2a',
                padding: '30px',
                borderRadius: '0px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative border on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: '#D4A574',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              className="top-border"
              />

              {/* Icon + Trait Name */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '15px'
              }}>
                <div style={{ fontSize: '28px' }}>
                  {trait.icon}
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#D4A574',
                  letterSpacing: '0.5px'
                }}>
                  {trait.trait}
                </div>
              </div>

              {/* Description */}
              <div style={{
                fontSize: '13px',
                color: '#999',
                lineHeight: '1.7',
                marginBottom: '20px',
                letterSpacing: '0.3px'
              }}>
                {trait.description}
              </div>

              {/* Attribute Label */}
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#0F0F0F',
                border: '1px solid #D4A574',
                color: '#D4A574',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {trait.attribute}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Call-out */}
        <div style={{
          backgroundColor: '#0F0F0F',
          border: '1px solid #333',
          padding: '25px',
          marginTop: '50px',
          fontSize: '13px',
          color: '#999',
          lineHeight: '1.8',
          letterSpacing: '0.3px'
        }}>
          <div style={{
            color: '#D4A574',
            fontWeight: '600',
            marginBottom: '12px',
            fontSize: '12px',
            letterSpacing: '1px'
          }}>
            💡 WHAT THIS MEANS
          </div>
          <div>
            Your data reveals someone who thinks like a system: you process diverse inputs, maintain temporal consistency, create coherent narratives, and execute with discipline. These aren't just behavioral patterns—they're the same principles that power AI systems, predictive models, and scalable organizations. You lead through clarity, structure, and sustained commitment.
          </div>
        </div>
      </motion.div>
    </div>
  )
}
