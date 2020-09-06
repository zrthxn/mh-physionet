import React, { useState, useRef, useEffect } from 'react'

export interface CameraComponentProps {
  showStream: boolean
  requestedMedia: object
  feedInto?: React.FC<StreamInputProps> | null
}

export interface StreamInputProps {
  stream: MediaStream
}

export function useUserMedia(requestedMedia: object) {
  const [mediaStream, setMediaStream] = useState(new MediaStream())

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
        setMediaStream(stream)
      } catch(err) {
        console.error(err)
      }
    }

    enableStream()
    return function cleanup() {
      mediaStream.getTracks().forEach(track => {
        track.stop()
      })
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}

export const CameraStream: React.FC<CameraComponentProps> = ({ showStream, requestedMedia, feedInto }) => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const [isStreamOpen, setStreamOpen] = useState(true)
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    throw new Error('Browser API Media Devices not available')

  const mediaStream = useUserMedia(requestedMedia)

  if (mediaStream && videoRef.current) {
    videoRef.current.srcObject = mediaStream
    // setStreamOpen(true)
  }

  return (
    <div className="container">
      {
        isStreamOpen ? (
          <div>
            {
              showStream ? (
                <video ref={videoRef} width="auto" height="250px" 
                  autoPlay playsInline 
                />
              ) : null
            }
            
            {
              feedInto ? (
                feedInto({
                  stream: mediaStream
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
