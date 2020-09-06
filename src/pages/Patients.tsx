import React, { useState, useContext } from 'react'
// import MicRecorder from 'mic-recorder-to-mp3';
import { CameraStream } from '../components/Camera'
import { PoseNet } from '../components/PoseNet'
import { AppContext } from '../ContextProvider'

export default function Patients() {
  const [isStreamReady, setStreamReady] = useState(false)
  const [showCam, setShowCam] = useState(true)

  const context = useContext(AppContext)

  return (
    <article>
      <h1>Patient Area</h1>

      {/* <CameraStream showStream
        requestedMedia={context.state.CAMERA_CONFIG}
        feedInto={(fedInProps)=>(
          <PoseNet {...fedInProps} 
            config={context.state.POSENET_MODEL_CONFIG}
          />
        )}
      /> */}
    </article>
  )
}
