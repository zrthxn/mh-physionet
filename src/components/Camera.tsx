import React, { useState, useRef, useEffect, CSSProperties } from 'react'

export interface CameraComponentProps {
  showStream: boolean
  requestedMedia: object
  feedInto?: React.FC<VideoInputProps> | null
  style?: CSSProperties
  size?: {
    height: string,
    width: string
  }
}

export interface VideoInputProps {
  video: HTMLVideoElement | null
}

export function useUserMedia(requestedMedia: object) {
  const [mediaStream, setMediaStream] = useState<MediaStream>()

  useEffect(() => {
    async function enableStream() {
      try {
        setMediaStream(
          await navigator.mediaDevices.getUserMedia(requestedMedia)
        )
      } catch(err) {
        console.error(err)
      }
    }

    if(!mediaStream)
      enableStream()
    else
      return function cleanup() {
        if(mediaStream)
          for (const track of mediaStream.getTracks()) {
            track.stop()
          }
      }
  }, [mediaStream, requestedMedia])

  return mediaStream
}

export const CameraStream: React.FC<CameraComponentProps> = ({ showStream, requestedMedia, feedInto }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentRef, setCurrentRef] = useState(videoRef)
  const [showVideo, setShowVideo] = useState(showStream)

  useEffect(()=>{
    setShowVideo(showStream)
  }, [showStream])
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    throw new Error('Browser API Media Devices not available')

  const mediaStream = useUserMedia(requestedMedia)

  useEffect(()=>{
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream
      setCurrentRef(videoRef)
      console.log('Captured MediaStream')
    }
  }, [mediaStream])

  return (
    <div className="video-display">
      {
        mediaStream ? (
          <div className="container">
            {
              showVideo ? (
                <video ref={currentRef} width="auto" height="250px"
                  onCanPlay={currentRef.current ? currentRef.current.play : undefined} 
                  autoPlay playsInline
                  style={{
                    transform: "scaleX(-1)"
                  }} 
                />
              ) : null
            }
            
            {
              feedInto ? (
                feedInto({
                  video: currentRef.current
                })
              ) : null
            }
          </div>
        ) : (
          <p>No video</p>
        )
      }
    </div>
  )
}
