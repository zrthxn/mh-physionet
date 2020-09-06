import React, { useState, useContext } from 'react'
import { CameraStream } from '../components/Camera'
import { PoseNetDetector } from '../components/PoseNet'
import { AppContext } from '../ContextProvider'

export default function Patients() {
  const [isStreamReady, setStreamReady] = useState(false)
  const [showCam, setShowCam] = useState(true)

  const context = useContext(AppContext)

  return (
    <article>
      <h1>Patient Area</h1>

      <CameraStream showStream
        requestedMedia={context.state.CAMERA_CONFIG}
        size={{ width: "auto", height: "250px" }}
        feedInto={(incomingProps)=>(
          <PoseNetDetector {...incomingProps} 
            config={context.state.POSENET_MODEL_CONFIG}
          />
        )}
      />
    </article>
  )
}
