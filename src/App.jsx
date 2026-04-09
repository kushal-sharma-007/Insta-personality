import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import KeyFindings from './components/KeyFindings'
import PersonalityProfile from './components/PersonalityProfile'
import StoryGallery from './components/StoryGallery'
import ExecutiveSummary from './components/ExecutiveSummary'
import PredictiveInsights from './components/PredictiveInsights'
import { generateDemoData, buildStoryHeatmapData } from './utils/storyAnalyzer'
import storiesData from './utils/storiesData.json'
import './App.css'

function App() {
  // Load stories from file system
  const [stories, setStories] = useState({})
  const [heatmapData, setHeatmapData] = useState(generateDemoData())
  const [loading, setLoading] = useState(true)
  const [artistYouTubeLinks, setArtistYouTubeLinks] = useState({})
  const [topSongs, setTopSongs] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Refs for scroll-to-section
  const generativeRef = useRef(null)
  const descriptiveRef = useRef(null)
  const predictiveRef = useRef(null)
  const galleryRef = useRef(null)
  const findingsRef = useRef(null)
  const personalityRef = useRef(null)
  const insightsRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSidebarOpen(false)
  }

  useEffect(() => {
    const loadStories = async () => {
      try {
        // Build heatmap from real stories
        const heatmap = {}
        const storyGallery = {
          adventure: [],
          creative: [],
          social: [],
          reflective: [],
          food: []
        }

        // Process all stories
        storiesData.stories.forEach(story => {
          // Add to heatmap with story details
          if (story.date) {
            if (!heatmap[story.date]) {
              heatmap[story.date] = { count: 0, stories: [] }
            }
            heatmap[story.date].count += 1
            heatmap[story.date].stories.push({
              id: story.id,
              thumb: `${import.meta.env.BASE_URL}stories/${story.month}/${story.filename}`,
              caption: story.caption,
              tags: [story.theme, 'instagram', 'story', ...(story.genres || [])]
            })
          }

          // Add to gallery by theme
          const theme = story.theme || 'reflective'
          if (!storyGallery[theme]) {
            storyGallery[theme] = []
          }

          storyGallery[theme].push({
            id: story.id,
            thumb: `${import.meta.env.BASE_URL}stories/${story.month}/${story.filename}`,
            caption: story.caption,
            tags: [theme, 'instagram', 'story', ...(story.genres || [])]
          })
        })

        // Calculate top 5 songs/genres
        const genreFreq = {}
        storiesData.stories.forEach(story => {
          (story.genres || []).forEach(genre => {
            genreFreq[genre] = (genreFreq[genre] || 0) + 1
          })
        })
        const topSongs = Object.entries(genreFreq)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }))

        // Sort stories within each theme by date (newest first)
        Object.keys(storyGallery).forEach(theme => {
          storyGallery[theme].sort((a, b) => b.id - a.id)
          // DON'T slice - keep all stories for shuffle feature
          // Only limit to 5 in the display component
        })

        console.log('Loaded stories:', Object.keys(storyGallery).map(k => `${k}: ${storyGallery[k].length}`))
        console.log('Heatmap data:', Object.keys(heatmap).length, 'dates with stories')
        console.log('Sample heatmap entry:', heatmap[Object.keys(heatmap)[0]])
        console.log('Top songs:', topSongs.map(s => `${s.name} (${s.count})`))

        setHeatmapData(heatmap)
        setStories(storyGallery)
        setArtistYouTubeLinks(storiesData.artistYouTubeLinks)
        setTopSongs(topSongs)
      } catch (error) {
        console.error('Could not load real stories:', error)
        // Fallback to demo data
        setHeatmapData(generateDemoData())
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [])

  // Sample data for the personality profile
  const [personalityData] = useState({
    archetype: 'The Creative Wanderer',
    traits: ['Authentic', 'Introspective', 'Adventurous', 'Artistic'],
    description: `Visual and thematic analysis indicates a profile characterized by intentional content curation, with emphasis on authentic self-documentation over performative sharing. Narrative themes strongly favor introspective reflection and creative exploration, complemented by moderate social engagement. Content strategy demonstrates sophisticated aesthetic awareness and consistent emotional depth.`,
    
    dominantColors: ['#D4A574', '#8B6F47', '#2C3E50', '#E8E8E8'],
    colorDescription: `Color palette analysis reveals deliberate aesthetic choices: warm gold (#D4A574) and brown (#8B6F47) produce 52% of dominant colors, suggesting preference for warm, natural tones. Deep tones (#2C3E50) comprise 24% of secondary palette, while neutral whites (#E8E8E8) constitute 24%. Consistent color language across stories indicates sophisticated visual brand identity.`,
    
    genres: [
      { name: 'Indie Pop', percentage: 68 },
      { name: 'Alternative', percentage: 45 },
      { name: 'Lo-Fi Hip Hop', percentage: 38 }
    ],
    
    words: [
      { word: 'adventure', frequency: 45 },
      { word: 'light', frequency: 38 },
      { word: 'moment', frequency: 32 },
      { word: 'peace', frequency: 28 },
      { word: 'explore', frequency: 25 },
      { word: 'dream', frequency: 22 },
      { word: 'beauty', frequency: 20 },
      { word: 'journey', frequency: 18 },
      { word: 'connection', frequency: 16 },
      { word: 'soul', frequency: 14 },
      { word: 'inspire', frequency: 12 },
      { word: 'authentic', frequency: 11 },
      { word: 'create', frequency: 10 },
      { word: 'mindful', frequency: 9 },
      { word: 'vibrant', frequency: 8 },
      { word: 'reflect', frequency: 7 },
      { word: 'embrace', frequency: 6 },
      { word: 'flow', frequency: 5 },
      { word: 'wonder', frequency: 4 },
      { word: 'bloom', frequency: 3 }
    ],
    
    sentiments: {
      positive: 72,
      neutral: 18,
      negative: 10
    },
    
    emotionalDrivers: `Content analysis reveals a primary motivation toward authentic self-expression and meaningful documentation. Story distribution emphasizes creative exploration (26% adventure, 26% creative, 25% reflective) over performative sharing. Consistent caption depth and thematic curation indicate intentional content strategy aligned with personal values.`,
    
    interests: [
      { name: 'Photography', percentage: 78 },
      { name: 'Travel', percentage: 65 },
      { name: 'Fashion', percentage: 58 },
      { name: 'Wellness', percentage: 52 },
      { name: 'Music', percentage: 48 },
      { name: 'Food &amp; Culture', percentage: 42 }
    ]
  })

  return (
    <div style={{ backgroundColor: '#0F0F0F', color: '#E8E8E8', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          left: '20px',
          top: '20px',
          zIndex: 1001,
          backgroundColor: '#D4A574',
          border: 'none',
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0F0F0F',
          fontSize: '20px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#8B6F47'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#D4A574'}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '280px',
          height: '100vh',
          backgroundColor: '#151515',
          border: '1px solid #2a2a2a',
          borderRight: '2px solid #D4A574',
          overflowY: 'auto',
          zIndex: 1000,
          padding: '20px',
          paddingTop: '80px'
        }}
      >
        <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#D4A574', textTransform: 'uppercase', marginBottom: '20px' }}>
          Navigation
        </div>
        
        <motion.nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Generative Section */}
          <div>
            <button
              onClick={() => scrollToSection(generativeRef)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#D4A574',
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '1px',
                textAlign: 'left',
                width: '100%',
                padding: '8px 0',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#E8C547'}
              onMouseLeave={(e) => e.target.style.color = '#D4A574'}
            >
              ① GENERATIVE
            </button>
            <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => scrollToSection(galleryRef)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#999',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#D4A574'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                → Story Gallery
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '12px 0' }}></div>

          {/* Descriptive Section */}
          <div>
            <button
              onClick={() => scrollToSection(descriptiveRef)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#D4A574',
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '1px',
                textAlign: 'left',
                width: '100%',
                padding: '8px 0',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#E8C547'}
              onMouseLeave={(e) => e.target.style.color = '#D4A574'}
            >
              ② DESCRIPTIVE
            </button>
            <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => scrollToSection(findingsRef)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#999',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#D4A574'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                → Key Findings
              </button>
              <button
                onClick={() => scrollToSection(personalityRef)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#999',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#D4A574'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                → Personality Profile
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '12px 0' }}></div>

          {/* Predictive Section */}
          <div>
            <button
              onClick={() => scrollToSection(predictiveRef)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#D4A574',
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '1px',
                textAlign: 'left',
                width: '100%',
                padding: '8px 0',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#E8C547'}
              onMouseLeave={(e) => e.target.style.color = '#D4A574'}
            >
              ③ PREDICTIVE
            </button>
            <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => scrollToSection(insightsRef)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#999',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#D4A574'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                → Predictive Insights
              </button>
            </div>
          </div>
        </motion.nav>
      </motion.div>

      {/* Main Content */}
      <div style={{ flex: 1, width: '100%' }}>
        {/* Header with Background Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #0F0F0F 0%, #151515 100%)',
            padding: '80px 40px 60px',
            textAlign: 'center',
            borderBottom: '2px solid #D4A574',
            marginBottom: '40px'
          }}
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: 'rgba(212, 165, 116, 0.1)',
              border: '1px solid #D4A574',
              fontSize: '10px',
              color: '#D4A574',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '20px',
              fontWeight: 600
            }}
          >
            ✦ Personal Digital Archive ✦
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontSize: '48px',
              fontWeight: 300,
              letterSpacing: '-1px',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #D4A574, #8B6F47)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Insta-Personality
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '14px',
              color: '#999',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            A Year in Stories
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: '14px',
              color: '#999',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            Data-driven personality profile powered by Instagram story archives
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontSize: '16px',
              color: '#D4A574',
              letterSpacing: '1px',
              fontStyle: 'normal',
              fontWeight: '500',
              marginTop: '20px'
            }}
          >
            Curator: Kushal Sharma
          </motion.p>
        </motion.div>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0px 40px 60px 40px' }}>
        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 1: GENERATIVE - The Raw Data */}
        {/* ═══════════════════════════════════════════════════════ */}
        <motion.div
          ref={generativeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#D4A574', marginBottom: '15px' }}>
            ① GENERATIVE
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '1px', color: '#E8E8E8', marginBottom: '15px' }}>
            The Raw Dataset
          </h2>
          <p style={{ color: '#999', fontSize: '14px', maxWidth: '700px' }}>
            84 stories across 5 themes, collected over 1 year. Each story is a data point revealing patterns in behavior, preferences, and creative expression.
          </p>
        </motion.div>

        {/* Executive Summary */}
        {!loading && Object.keys(stories).length > 0 && (
          <ExecutiveSummary stories={stories} heatmapData={heatmapData} topSongs={topSongs} />
        )}

        {/* Story Gallery */}
        <motion.div
          ref={galleryRef}
          style={{ marginTop: '60px', marginBottom: '80px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? (
            <div style={{
              backgroundColor: '#151515',
              border: '1px solid #2a2a2a',
              padding: '40px',
              textAlign: 'center',
              color: '#999'
            }}>
              Loading your stories...
            </div>
          ) : (
            <StoryGallery stories={stories} />
          )}
        </motion.div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 2: DESCRIPTIVE - What Data Reveals */}
        {/* ═══════════════════════════════════════════════════════ */}
        <motion.div
          ref={descriptiveRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#D4A574', marginBottom: '15px' }}>
            ② DESCRIPTIVE
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '1px', color: '#E8E8E8', marginBottom: '15px' }}>
            What the Data Reveals
          </h2>
          <p style={{ color: '#999', fontSize: '14px', maxWidth: '700px' }}>
            Pattern recognition and thematic analysis uncovering strategic insights about content behavior, theme distribution, and engagement drivers.
          </p>
        </motion.div>

        {/* Key Findings */}
        {!loading && Object.keys(stories).length > 0 && (
          <motion.div
            ref={findingsRef}
            style={{ marginTop: '60px', marginBottom: '40px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <KeyFindings stories={stories} heatmapData={heatmapData} topSongs={topSongs} />
          </motion.div>
        )}

        {/* Personality Profile - Based on Key Findings */}
        {!loading && Object.keys(stories).length > 0 && (
          <motion.div
            ref={personalityRef}
            style={{ marginTop: '60px', marginBottom: '80px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#D4A574', marginBottom: '10px', textTransform: 'uppercase' }}>
                Personal Identity
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '300', letterSpacing: '1px', color: '#E8E8E8', marginBottom: '10px' }}>
                The Person Behind the Data
              </h3>
              <p style={{ color: '#999', fontSize: '13px', maxWidth: '700px' }}>
                These findings don't just describe what happened—they reveal who you are. Your data reveals personality traits that align with how systematic thinkers, builders, and leaders approach the world.
              </p>
            </div>
            <PersonalityProfile stories={stories} heatmapData={heatmapData} topSongs={topSongs} />
          </motion.div>
        )}

        {/* Analytics Dashboard - Removed (consolidated into Predictive section) */}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 3: PREDICTIVE - What Comes Next */}
        {/* ═══════════════════════════════════════════════════════ */}
        <motion.div
          ref={predictiveRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#D4A574', marginBottom: '15px' }}>
            ③ PREDICTIVE
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '1px', color: '#E8E8E8', marginBottom: '15px' }}>
            What Comes Next
          </h2>
          <p style={{ color: '#999', fontSize: '14px', maxWidth: '700px' }}>
            AI-powered forecasting using linear regression and momentum analysis to predict future content trends, optimal posting patterns, and engagement opportunities.
          </p>
        </motion.div>

        {/* Predictive Insights */}
        {!loading && Object.keys(stories).length > 0 && (
          <motion.div
            ref={insightsRef}
            style={{ marginTop: '60px', marginBottom: '80px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <PredictiveInsights stories={stories} heatmapData={heatmapData} />
          </motion.div>
        )}
      </div>
      </div>
    </div>
  )
}

export default App
