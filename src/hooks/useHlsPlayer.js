import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

export function useHlsPlayer(videoRef, streamUrl, autoPlay = true) {
  const hlsRef = useRef(null)
  const [qualities, setQualities] = useState([])
  const [currentQuality, setCurrentQuality] = useState(-1)
  const [error, setError] = useState(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !streamUrl) return

    let hls = null

    // Support standard MP4 videos natively
    if (streamUrl.toLowerCase().includes('.mp4')) {
      video.src = streamUrl
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          video.play().catch(e => console.log('Autoplay prevented', e))
        }
      })
      return
    }
    
    // Check if the browser supports HLS.js
    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
      })
      hlsRef.current = hls

      hls.loadSource(streamUrl)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const availableQualities = data.levels.map((level, index) => ({
          level: index,
          height: level.height,
          bitrate: level.bitrate,
        }))
        setQualities(availableQualities)
        if (autoPlay) {
          video.play().catch(e => console.log('Autoplay prevented', e))
        }
      })

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        setCurrentQuality(data.level)
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              setError(data)
              hls.destroy()
              break
          }
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = streamUrl
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          video.play().catch(e => console.log('Autoplay prevented', e))
        }
      })
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [videoRef, streamUrl, autoPlay])

  const setQualityLevel = (levelIndex) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex
      setCurrentQuality(levelIndex)
    }
  }

  return {
    qualities,
    currentQuality,
    setQualityLevel,
    error,
  }
}
