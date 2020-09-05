import React, { useState, useRef } from 'react'

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(new HTMLVideoElement())
  const [isStreamOpen, setStreamOpen] = useState(false)
  // const [mediaStream, setMediaStream] = useState(undefined)
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    throw new Error('Browser API Media Devices not available')

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      facingMode: 'user'
    }
  }).then( stream => {
    setStreamOpen(true)
    videoRef.current.srcObject = stream;
  })
  
  return (
    <div>
      {
        isStreamOpen ? (
          <video ref={videoRef} onCanPlay={videoRef.current.play} 
            width="500px" height="500px" autoPlay playsInline 
          />
        ) : (
          <p>No video</p>
        )
      }
      <hr/>
    </div>
  )
}
