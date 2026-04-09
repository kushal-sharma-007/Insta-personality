import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Lightbox = ({ story, onClose }) => {
  const isVideo = story.thumb && (story.thumb.endsWith('.mp4') || story.thumb.endsWith('.mov') || story.thumb.endsWith('.webm'))

  // Generate descriptions based on VISUAL INTENT + caption understanding
  const generateStoryDescription = () => {
    const caption = (story.caption || '').toLowerCase().trim()
    const theme = story.theme || 'moment'
    const genres = story.genres || []
    const id = story.id || ''
    
    // Analyze visual intent from genre + theme + caption combinations
    const analyzeMood = () => {
      const genreString = genres.join(' ').toLowerCase()
      
      // Genre-driven visual mood
      if (genres.length > 0) {
        if (genreString.includes('soul') || genreString.includes('r&b') || genreString.includes('contemporary')) {
          return { mood: 'intimate', palette: 'warm', intensity: 'high' }
        }
        if (genreString.includes('electronic') || genreString.includes('dance') || genreString.includes('house')) {
          return { mood: 'energetic', palette: 'vibrant', intensity: 'high' }
        }
        if (genreString.includes('indie') || genreString.includes('alternative') || genreString.includes('folk')) {
          return { mood: 'introspective', palette: 'muted', intensity: 'medium' }
        }
        if (genreString.includes('blues') || genreString.includes('rock') || genreString.includes('metal')) {
          return { mood: 'raw', palette: 'contrasted', intensity: 'high' }
        }
        if (genreString.includes('classic')) {
          return { mood: 'nostalgic', palette: 'vintage', intensity: 'medium' }
        }
      }
      
      // Theme-driven visual mood fallback
      if (theme === 'reflective') return { mood: 'intimate', palette: 'warm_shadows', intensity: 'medium' }
      if (theme === 'adventure') return { mood: 'expansive', palette: 'natural', intensity: 'high' }
      if (theme === 'creative') return { mood: 'artistic', palette: 'experimental', intensity: 'high' }
      if (theme === 'social') return { mood: 'energetic', palette: 'vibrant', intensity: 'high' }
      if (theme === 'food') return { mood: 'tactile', palette: 'warm', intensity: 'medium' }
      
      return { mood: 'contemplative', palette: 'neutral', intensity: 'medium' }
    }
    
    // Story-specific visual interpretations - now focused on WHAT THE VISUAL IS DOING
    const captionVisuals = {
      'शिवाकान्त': 'Intimate devotional moment—likely hands in prayer or eyes closed in meditation, set in warm interior lighting. The visual punctuates internal spiritual experience.',
      "can't choose nothing": 'Framing indecision visually. Multiple objects, high depth of field chaos, or rapid perspective shifts reflecting decision paralysis.',
      'defiance': 'Direct gaze to camera or bold compositional choice. Strong lighting contrasts, sharp focus, frontal confrontation. Visual rebellion.',
      'chandni chowk chaos': 'Dense urban composition—layered human movement, tight framing, high visual information density. COLOR SATURATION: High. The visual drowns in stimuli.',
      'say less': 'Minimal dialogue frames—silent action, gesture-driven communication, perhaps hands, facial expression without context. Visual letting body speak.',
      'vibe coding my foot': 'Dual narrative in frame—technical objects (keyboard, screen) + motion/flow elements. Visual juxtaposition of cerebral vs. physical.',
      'git to gate soon': 'Anticipatory framing—horizontal lines, leading composition, upward angles suggesting movement. Lighting suggesting departure (dawn/dusk).',
      'when the ed chose cricket': 'Energetic athletic framing. Lines of motion, vibrant clothing, context suggesting game/sport environment. HIGH motion blur or midframe action.',
      'ab de villiers in town': 'Professional athletic presence—composed, controlled, spotlight-ready framing. Likely outdoor daylight, confident body language.',
      'burma': 'Golden hour pastry photography—warm lighting, nostalgic color palette, shallow depth of field making the sweet the hero.',
      'this won\'t go away': 'Lingering visual—blurred elements, fade effects, or repeated composite frames. The image refuses to clear.',
      'lock and load': 'Sharp, military-precise framing. High contrast, bold geometric composition, strong focal point. Tactical positioning in frame.',
      'bombay skies': 'Urban sky-centric composition—looking upward, horizon line dominating. Colors of city light: oranges, deep blues, artificial glow against natural sky.',
      'bombay, again': 'Return visual language—similar framing angles from different time, same location anchoring. Cyclical composition.',
      'no ships': 'Empty harbors, negative space emphasizing absence. Horizontal lines, still water, minimal activity. Visual loneliness.',
      'the modern pilgrim 3°': 'Documentary style—journey progression visible (vehicle, terrain, map elements). Iteration 3 feels systematic, methodical framing.',
      'jammu & kashmir': 'Mountainous terrain dominating composition. Likely high altitude perspective, dramatic sky, vast scale. Color: greens and earth tones.',
      'back to the dragon\'s den': 'Challenging terrain close-up. Difficult navigation visible. Warm lighting suggesting effort (golden hour climb completion).',
      'pir panjal': 'Alpine landscape emphasis—tall composition, peaks dominating, often monochromatic or cool-toned. High vantage point aesthetic.',
      'spruced in a jiffy': 'Before-after visual language or sudden transformation moment. Quick-cut pacing or rapid focus shift showing rapid change.',
      'dil - hi': 'Extracted element focus—zoomed, highlighted, isolated from context. Probably close-up with other elements blurred away.',
      'haryana': 'Transitional landscape—industrial/agricultural collision visible. Color palette mixing earth tones + industrial grays.',
      'architect of chaos': 'Organized chaos composition—structured frame containing disorder. Layered elements where chaos is designed.',
      '118* chase': 'Sports scoreboard or cricket-specific visual. Mid-action framing, incomplete moment frozen. Tension captured.',
      'eve': 'Feminine silhouette or portrait. Evening light (hence EVE), likely shadow play or backlighting creating feminine form.',
      'india, that is bharat': 'Nationalist symbology visible—flags, lettering, dual signage showing language/identity shift. Visual linguistic expression.',
      'bom': 'Mumbai compressed—recognizable cityscape, likely from transport (window frame), rapid abbreviated aesthetic.',
      'can\'t blink': 'Hyperfocus framing—shallow depth of field, intense gaze direction, nothing peripheral. Tunnel vision visual effect.',
      'heavy is the hush of money': 'Wealth visual markers—luxury items, high-end interiors, or conspicuous consumption. Lighting: professional, cool-toned.',
      '2 years since we almost went to jail': 'Celebratory moment—smiling faces, relaxed body language, likely group/social setting. Warm color palette.',
      'rev it. rip it. rule it': 'Escalation visible through frame composition—movement lines, velocity suggestion, velocity vectors in frame.',
      'fight or flight': 'Duality in frame—split composition or two-option visual language. Tense body language, high contrast lighting.',
      'the modern pilgrim': 'Journey documentation aesthetic—vehicle, terrain, progress visible. Systematic framing.',
      'drove 900 km in a day, on 2 hours of sleep just to swim across the ganga 16 times': 'Extreme physical effort visible—exhaustion in frame, water immersion, ritual repetition evident. High effort, focused intensity.',
      'ganga': 'Sacred water visual—holy confluence, ritual immersion, spiritual aesthetic. Often wide river shot or intimate water-body interaction.',
      'my sane self is bristling': 'Internal conflict visible as facial tension or environmental contradiction. Strained body language, conflicted framing.',
      'misperceived patrician': 'Class markers misread visually—formal wear in unexpected context or formal positioning in casual setting. Visual irony.',
      'one last time for those we hold close, and for those we never meet': 'Intimate close-up with mortality subtext—vulnerable framing, golden light creating farewell mood, depth-of-field intimacy, eyes as story portal.',
      'cuts and bruises': 'Physical trauma visible—bandages, injury context, or metaphorical damage. Honest documentary framing.',
      '——> no one': 'Direction without destination—arrow composition pointing to empty space. Negative space emphasis, lonely framing.',
      'behisab uljhanon': 'Complicated visual composition—layered elements, unclear focal point, visual messiness reflecting untangled situations.',
      'a night full of apis': 'Interior coding environment visible—screens, keyboards, or dev workspace aesthetic. Night lighting (cold blue/white tones).',
      'hoor is ordering shots and i\'m delivering kill shots': 'Social energy visible—group dynamics, alcohol/drinking context, confident aggressive posturing. Vibrant, warm colors.',
      'when rashimirathi meets batalvi\'s loona': 'Literary collision visual—two aesthetic traditions blending. Props or compositional choices showing fusion.',
      'finesse': 'Skillful motion visible—grace, efficiency, smooth execution. Clean framing, precision body language.',
      'a classic real politik brunch': 'Formal meal setting with political undertones—power positioning, composed professionals, refined plating. Sophisticated color palette.',
      'hk-416': 'Weaponry aesthetic—technical equipment, industrial aesthetic, sharp lines. High contrast dramatic lighting.',
      'mission gujarat': 'Travel destination visual—recognizable Gujarat markers, motion suggesting journey, outdoor daylight aesthetic.',
      '0500 hours i travel a million miles': 'Pre-dawn aesthetic—blue/dark tones, artificial light, readiness positioning. Journey preparation visible.',
      'perfect form + runner\'s high': 'Athletic peak moment—strong musculature visible, controlled motion, endorphin expression (smile/energy). Outdoor activity lighting.',
      'a moment i\'ve rehearsed a thousand times': 'Practiced posture visible—muscle control, confident positioning, refined execution. Polished final frame.',
      'like a ray of hope': 'Light penetrating darkness—directional light beam, shadow-to-light composition, illumination as salvation.',
      'lost in the retro 70s office tomfoolery': 'Aesthetic nostalgia visual—70s color palette (browns, oranges, yellows), office environment, playful chaos.',
      'apprehensive': 'Tension in frame—stressed body language, uncertain gaze direction, tight framing amplifying discomfort.',
      'made for mayhem, muted on zoom': 'Duality—chaotic presence contained by screen borders. Energy bursting against virtual constraint.',
      'i look at her i see the moon, i look at the moon i see her': 'Poetic mirror imagery—likely alternating focuses or doubled subject, romantic lighting, celestial elements.',
      'the spainard has done it ! carlos alcaraz world no. 1 again': 'Victory moment—triumphant body language, likely trophy or achievement pose. Celebratory energy visible.',
      'visual pun intended 🌒 when titans clash beneath the blood moon eclipse': 'Celestial spectacle framing—moon prominence, dramatic red/orange tones, competing subjects creating visual tension.',
      'my office playing love quinn on me': 'Workplace setting—office environment, colleagues visible, role-play dynamic creating humorous tension.',
      'he was a pind boy she was a town girl': 'Class contrast visual—rural vs. urban aesthetic elements in frame. Color/composition showing opposition resolving through closeness.',
      'the fascist in me selling socialist lies': 'Ideological contradiction—contradictory visual elements, perhaps dual self-presentation or costume/authenticity tension.'
    }
    
    // Find the best matching caption interpretation
    for (const [captionKey, interpretation] of Object.entries(captionVisuals)) {
      if (caption.includes(captionKey)) {
        return interpretation
      }
    }
    
    // If no specific match, create mood-based descriptions
    const mood = analyzeMood()
    const themeVisualPatterns = {
      adventure: [
        `Expansive landscape composition suggesting freedom and scale. Golden or natural lighting revealing terrain. Wide focal plane inviting exploration. Color palette: earths and skies.`,
        `Journey framing—vehicle, path, or horizon dominating. Movement vector suggests forward momentum. Hour of day evident (golden hour often chosen for travel shots).`,
        `Elevated perspective showing vast terrain below. Sky-heavy composition. Colors suggest altitude: cooler tones, cleaner air quality visible in image clarity.`,
        `Motion captured through framing—blur effects or mid-action positioning. Energy visible as environmental change or physical traversal.`,
        `Unfamiliar landscape as protagonist. Compositional focus on NEW rather than known. Color saturation suggesting fresh perception.`
      ],
      reflective: [
        `Intimate framing—close personal space, often self-portrait or extreme close-up. Warm golden lighting creating vulnerability. Depth of field isolating subject from world.`,
        `Directional light (sunrise/sunset) creating shadow play. Play of light and dark reflecting internal duality. Textured surfaces enhanced by raking light.`,
        `Solitary composition—one subject, quiet background, minimal environmental information. Negative space allowing mental expansion.`,
        `Interior quiet aesthetic—home, bed, intimate space visible. Soft diffused lighting suggesting calm or melancholy. Color palette: warm ambers or cool silvers.`,
        `Still life with metaphorical weight—meaningful objects, careful arrangement, each element chosen. Contemplative curation visible in frame.`
      ],
      creative: [
        `Artistic composition—rule-of-thirds broken intentionally, unusual framing angles, experimental perspective. This is composition-as-meaning.`,
        `Color boldness—saturated or unsaturated intentionally for effect. Color palette as design choice, not documentation. Mood-through-color strategy visible.`,
        `Depth layering—multiple focal planes, foreground intrigue, compositional complexity. Visual richness rewarding attention.`,
        `Props or elements arranged for visual storytelling not documentation. Everything in frame serves aesthetic intention, not functional description.`,
        `Lighting as character—dramatic side-light, rim lights, silhouettes. Lighting creates mood-first rather than visibility-first.`
      ],
      social: [
        `Group dynamics visible—multiple subjects, interaction between people, energy of connection. Tight framing often includes multiple faces/bodies.`,
        `Energetic composition—motion blur possible, high activity angles, vibrant backgrounds. Energy level high in frame.`,
        `Shared space emphasizing togetherness—everyone clearly co-present, proximity visible, light spreading democratically across subjects.`,
        `Casual documentation aesthetic—authenticity over polish, candid capture over posed hierarchy. Spontaneity visible in body language.`,
        `Color warmth and saturation suggesting celebration or contentment. Environmental comfort evident in setting choice and lighting.`
      ],
      food: [
        `Close intimate food photography—plate as protagonist, detailed texture visible. Shallow depth of field isolating specific elements. Colors of food saturated and appealing.`,
        `Cultural context visible—traditional plating, heritage equipment, or environment suggesting origin tradition.`,
        `Golden hour or soft warm lighting making food irresistible. Shadows and highlights creating volume and texture appetite appeal.`,
        `Storytelling through arrangement—heritage items in frame, serving context suggesting ritual or celebration.`,
        `Sensory focus—the image makes the viewer taste/smell/feel the food through visual precision and warm sensory color palette.`
      ]
    }
    
    const visualPatterns = themeVisualPatterns[theme] || themeVisualPatterns.creative
    const index = (parseInt(id.slice(-2), 16) || 0) % visualPatterns.length
    return visualPatterns[index]
  }

  const storyDescription = generateStoryDescription()

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
            maxWidth: '800px',
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

          {/* Media */}
          <div style={{ marginBottom: '30px', backgroundColor: '#0F0F0F', border: '1px solid #2a2a2a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isVideo ? (
              <video
                src={story.thumb}
                controls
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  backgroundColor: '#0F0F0F',
                  transform: story.id === '17886936918410869' ? 'rotate(-90deg)' : 'none',
                  transformOrigin: 'center'
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={story.thumb}
                alt={story.caption}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            )}
          </div>

          {/* Caption */}
          <div style={{
            fontSize: '16px',
            color: '#E8E8E8',
            marginBottom: '20px',
            fontWeight: 300,
            letterSpacing: '-0.5px'
          }}>
            {story.caption}
          </div>

          {/* Story Interpretation */}
          <div style={{
            backgroundColor: '#0F0F0F',
            border: '1px solid #D4A574',
            padding: '20px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#D4A574',
            lineHeight: '1.7',
            letterSpacing: '0.3px'
          }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: '#999' }}>
              💡 What This Moment Reveals
            </div>
            {storyDescription}
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {story.tags && story.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  backgroundColor: '#0F0F0F',
                  border: '1px solid #2a2a2a',
                  color: '#D4A574',
                  fontSize: '12px',
                  textTransform: 'lowercase',
                  letterSpacing: '0.5px'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const StoryGroup = ({ title, stories }) => {
  const [selectedStory, setSelectedStory] = useState(null)
  const [currentView, setCurrentView] = useState('initial') // 'initial' or 'shuffled'
  const [shuffledIndices, setShuffledIndices] = useState(null)

  const STORIES_TO_SHOW = Infinity  // Show all stories

  // Get random indices for shuffle
  const handleShuffle = () => {
    if (stories.length <= STORIES_TO_SHOW) {
      // If we have 5 or fewer stories, just reorder
      const indices = [...Array(stories.length).keys()]
      setShuffledIndices(indices.sort(() => Math.random() - 0.5))
    } else {
      // Get random indices from full pool
      const availableIndices = [...Array(stories.length).keys()]
      const randomIndices = []
      for (let i = 0; i < STORIES_TO_SHOW; i++) {
        const randomIdx = Math.floor(Math.random() * availableIndices.length)
        randomIndices.push(availableIndices[randomIdx])
        availableIndices.splice(randomIdx, 1)
      }
      setShuffledIndices(randomIndices.sort(() => Math.random() - 0.5))
    }
    setCurrentView('shuffled')
  }

  const handleResetShuffle = () => {
    setShuffledIndices(null)
    setCurrentView('initial')
  }

  // Determine which stories to display
  const getDisplayStories = () => {
    if (currentView === 'shuffled' && shuffledIndices) {
      return shuffledIndices.map(idx => stories[idx])
    }
    // Default: show first STORIES_TO_SHOW (or all if fewer exist)
    return stories.slice(0, Math.min(STORIES_TO_SHOW, stories.length))
  }

  const displayStories = getDisplayStories()
  const totalAvailable = stories.length

  return (
    <div style={{ marginBottom: '50px' }}>
      {/* Group Title with Shuffle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <div style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '12px',
            color: '#D4A574',
            fontWeight: 400
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#666',
            marginTop: '4px',
            letterSpacing: '0.5px'
          }}>
            {currentView === 'shuffled' ? '🔀 Shuffled set' : `Showing 1-${Math.min(STORIES_TO_SHOW, totalAvailable)} of ${totalAvailable}`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {totalAvailable > STORIES_TO_SHOW && (
            <>
              {currentView === 'shuffled' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleResetShuffle}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: '#0F0F0F',
                    border: '1px solid #666',
                    color: '#999',
                    fontSize: '11px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#999'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#666'
                  }}
                >
                  ↻ Reset
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleShuffle}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: '#0F0F0F',
                    border: '1px solid #D4A574',
                    color: '#D4A574',
                    fontSize: '11px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4A574'
                    e.currentTarget.style.color = '#0F0F0F'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0F0F0F'
                    e.currentTarget.style.color = '#D4A574'
                  }}
                >
                  🔀 Shuffle
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '12px',
        marginBottom: '40px'
      }}>
        {displayStories && displayStories.length > 0 ? (
          displayStories.map((story) => {
            const isVideo = story.thumb && (story.thumb.endsWith('.mp4') || story.thumb.endsWith('.mov') || story.thumb.endsWith('.webm'))
            
            return (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.08, y: -4 }}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  border: '1px solid #D4A574',
                  backgroundColor: '#0F0F0F',
                  borderRadius: '2px',
                  boxShadow: '0 4px 12px rgba(212, 165, 116, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedStory(story)}
              >
                {isVideo ? (
                  <>
                    <video
                      src={story.thumb}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        transition: 'background-color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        color: '#D4A574',
                        opacity: 0
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 165, 116, 0.2)'
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)'
                        e.currentTarget.style.opacity = '0'
                      }}
                    >
                      ▶
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={story.thumb}
                      alt={story.caption}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        transition: 'background-color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 165, 116, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)'
                      }}
                    />
                  </>
                )}
              </motion.div>
            )
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '40px' }}>
            No stories in this category
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedStory && (
        <Lightbox
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  )
}

export default function StoryGallery({ stories }) {
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
        marginBottom: '15px',
        fontWeight: 400
      }}>
        Story Gallery
      </div>

      {/* Description */}
      <p style={{
        fontSize: '13px',
        color: '#999',
        marginBottom: '40px',
        lineHeight: '1.6',
        letterSpacing: '0.5px'
      }}>
        Thematic analysis of 84 stories reveals a dominant narrative: <strong style={{ color: '#D4A574' }}>Adventure</strong> (23 stories, 27%) represents exploration, discovery, and expansive thinking—perfectly aligned with how AI approaches complex problems. Below: curated content by theme.
      </p>

      {/* Story Groups */}
      {/* Featured Theme: Adventure */}
      <div style={{
        backgroundColor: '#0F0F0F',
        border: '2px solid #D4A574',
        padding: '25px',
        marginBottom: '50px',
        borderRadius: '2px'
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '2px',
          color: '#D4A574',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          ★ Primary Narrative
        </div>
        <div style={{
          fontSize: '16px',
          color: '#E8E8E8',
          fontWeight: 300,
          marginBottom: '12px'
        }}>
          Adventure & Discovery
        </div>
        <div style={{
          fontSize: '12px',
          color: '#999',
          lineHeight: '1.6'
        }}>
          27% of your content focuses on exploration and new experiences. This aligns with <strong style={{ color: '#D4A574' }}>how AI discovers patterns</strong>—through systematic exploration of data landscapes, pushing boundaries, and synthesizing insights from diverse territories.
        </div>
      </div>

      <StoryGroup title="Adventure & Travel" stories={stories.adventure} />
      <StoryGroup title="Creative & Artistic" stories={stories.creative} />
      <StoryGroup title="Social & Connection" stories={stories.social} />
      <StoryGroup title="Reflective & Mindful" stories={stories.reflective} />
      <StoryGroup title="Food &amp; Culture" stories={stories.food} />
    </div>
  )
}
