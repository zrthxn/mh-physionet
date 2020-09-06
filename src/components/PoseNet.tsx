import React, { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as PoseNet from '@tensorflow-models/posenet'

import { VideoInputProps } from './Camera'

interface PoseNetComponetProps extends VideoInputProps {
  config: PoseNet.ModelConfig
}

export const PoseNetDetector: React.FC<PoseNetComponetProps> = ({ video, config }) => {
  const [posenet, setposenet] = useState<PoseNet.PoseNet>()
  const [videoStream, setVideoStream] = useState<HTMLVideoElement | null>(null)
  
  useEffect(()=>{
    setVideoStream(video)
  }, [video])

  useEffect(() => {
    if(!posenet)
      tf.setBackend('cpu').then(()=>{
        PoseNet.load(config)
          .then((net)=>{
            setposenet(net)
            console.log('Model Loaded')
            
            startPoseDetection()
          })
      })
    else
      return function dispose() {
        setposenet(undefined)
      }
  }, [config, posenet])

  // List of detected poses
  var poses: any[] = []

  function startPoseDetection() {
    async function detectPose() {
      if(posenet && videoStream)
        poses = poses.concat(
          posenet.estimatePoses(videoStream, {
            flipHorizontal: true,
            decodingMethod: 'single-person'
          })
        )
      else {
        console.error(posenet && 'Model', videoStream && 'Video', 'Missing')
        console.log(posenet)
        console.log(videoStream)
      }

      requestAnimationFrame(detectPose)
    }

    detectPose()
  }

  return (
    <div>
      {
        posenet && videoStream ? (
          <span>PoseNet Active</span>
        ) : null
      }
    </div>
  )
}