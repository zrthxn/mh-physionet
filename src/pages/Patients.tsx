import React, { useState } from 'react'

import { CameraStream } from '../components/Camera'
import { PoseNet } from '../components/PoseNet'

export default function Patients() {
  const [isStreamReady, setStreamReady] = useState(false)
  const [showCam, setShowCam] = useState(true)

  return (
    <div>
      <h1>Patients</h1>

      <CameraStream showStream 
        onStreamReady={setStreamReady}
        feedInto={PoseNet}
      />
    </div>
  )
}
