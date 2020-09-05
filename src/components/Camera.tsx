import React, { useState, useRef } from 'react'

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const [isStreamOpen, setStreamOpen] = useState(false)
  // const [mediaStream, setMediaStream] = useState(undefined)
  
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
    videoRef.current.srcObject = stream;
  }).catch( err =>{
    console.error(err)
  })
  
  return (
    <div>
      {
        isStreamOpen ? (
          <video ref={videoRef} onCanPlay={videoRef.current.play} 
            width="-500px" height="auto" autoPlay playsInline 
          />
        ) : (
          <p>No video</p>
        )
      }
      <hr/>
    </div>
  )
}
