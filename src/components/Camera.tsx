import React, { useState, useRef, useEffect } from 'react'

export interface CameraComponentProps {
  showStream: boolean
  onStreamReady: Function
  feedInto?: React.FC<StreamInputProps> | null
}

export interface StreamInputProps {
  stream: MediaStream
}

export const CameraStream: React.FC<CameraComponentProps> = ({ showStream, onStreamReady, feedInto }) => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const [isStreamOpen, setStreamOpen] = useState(false)
  const [mediaStream, setMediaStream] = useState(new MediaStream())
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    throw new Error('Browser API Media Devices not available')

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      facingMode: 'user',
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 }
    }
  }).then( stream => {
    setStreamOpen(true)
    setMediaStream(stream)
    videoRef.current.srcObject = stream
  }).catch( err =>{
    console.error(err)
  })

  // useEffect(()=>{
  //   onStreamReady(isStreamOpen)
  // }, [isStreamOpen, onStreamReady])

  return (
    <div className="container">
      {
        isStreamOpen ? (
          <div>
            {
              showStream ? (
                <video ref={videoRef} onCanPlay={videoRef.current.play} 
                  width="500px" height="250px" autoPlay playsInline 
                />
              ) : null
            }
            
            {/* <feedInto stream={mediaStream}/>
            {
              feedInto ? (
                feedInto({
                  stream: mediaStream
                })
              ) : null
            } */}
          </div>
        ) : (
          <p>No video</p>
        )
      }
    </div>
  )
}
