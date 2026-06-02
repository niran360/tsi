import { useRef, useState, useEffect } from 'react'
import { useHlsPlayer } from '../hooks/useHlsPlayer'
import './VideoPlayer.css'

function VideoPlayer({
  streamUrl,
  cameras = [],
  layout = 'standard', // 'minimal', 'standard', 'enhanced'
  matchData,
  autoPlay = true,
  muted = false,
  onFullscreenChange,
  showSidebar = false,
  onToggleSidebar
}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controlsTimeoutRef = useRef(null)
  
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [volume, setVolume] = useState(0.8)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [activeCamera, setActiveCamera] = useState(cameras[0]?.id || 'main')
  
  // Use current camera's streamUrl if available, otherwise default streamUrl
  const activeStreamUrl = cameras.find(c => c.id === activeCamera)?.streamUrl || streamUrl

  const { qualities, currentQuality, setQualityLevel, error } = useHlsPlayer(
    videoRef,
    activeStreamUrl,
    autoPlay
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch(e => console.log('Play failed:', e))
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(controlsTimeoutRef.current)
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    container?.addEventListener('mouseleave', () => {
      if (isPlaying) setShowControls(false)
    })

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
      container?.removeEventListener('mouseleave', () => {})
      clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying])

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        await containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement
      setIsFullscreen(isFs)
      onFullscreenChange?.(isFs)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [onFullscreenChange])

  return (
    <div 
      ref={containerRef} 
      className={`video-player-wrapper layout-${layout} ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <div className="video-container">
        {error && (
          <div className="video-error-overlay">
            <p>Failed to load stream. Retrying...</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="main-video"
          crossOrigin="anonymous"
          playsInline
          onClick={() => setIsPlaying(!isPlaying)}
        />

        {matchData && (
          <div className={`score-overlay ${!showControls && isFullscreen ? 'hidden' : ''}`}>
            <div className="team-info home">
              <span className="team-name">{matchData.homeClub}</span>
              <span className="score">{matchData.homeGoals ?? '-'}</span>
            </div>
            
            <div className="match-status">
              <span className="minute">{matchData.minute ? `${matchData.minute}'` : 'Upcoming'}</span>
              {matchData.status === 'live' && <span className="live-indicator">LIVE</span>}
            </div>
            
            <div className="team-info away">
              <span className="score">{matchData.awayGoals ?? '-'}</span>
              <span className="team-name">{matchData.awayClub}</span>
            </div>
          </div>
        )}

        {cameras.length > 0 && (
          <div className={`camera-selector ${!showControls && isFullscreen ? 'hidden' : ''}`}>
            {cameras.map(cam => (
              <button
                key={cam.id}
                className={`camera-btn ${activeCamera === cam.id ? 'active' : ''}`}
                onClick={() => setActiveCamera(cam.id)}
                title={cam.name}
              >
                📹 {cam.name}
              </button>
            ))}
          </div>
        )}

        <div className={`controls-bar ${!showControls && isFullscreen ? 'hidden' : ''}`}>
          <div className="controls-left">
            <button className="control-btn" onClick={() => setIsPlaying(!isPlaying)} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            
            <div className="volume-group">
              <button className="control-btn" onClick={() => setIsMuted(!isMuted)} title={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="volume-slider"
              />
            </div>

            {qualities.length > 0 && (
              <select 
                className="quality-select"
                value={currentQuality}
                onChange={(e) => setQualityLevel(parseInt(e.target.value))}
              >
                <option value={-1}>Auto</option>
                {qualities.map(q => (
                  <option key={q.level} value={q.level}>
                    {q.height}p
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="controls-right">
            {onToggleSidebar && (
              <button className="control-btn" onClick={onToggleSidebar} title="Toggle Sidebar">
                {showSidebar ? '▶' : '◀'}
              </button>
            )}
            <button className="control-btn" onClick={toggleFullscreen} title="Fullscreen">
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
