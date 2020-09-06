import React, { useEffect, useState } from 'react'
import { load as LoadPoseNet, PoseNet as P, ModelConfig } from '@tensorflow-models/posenet'

import { StreamInputProps } from './Camera'

interface PoseNetComponetProps extends StreamInputProps {
  config: ModelConfig
}

export const PoseNet: React.FC<PoseNetComponetProps> = ({ stream, config }) => {
  const [posenet, setposenet] = useState<P>()
  const [videoStream, setVideoStream] = useState(new MediaStream())
  
  useEffect(()=>{
    setVideoStream(stream)
  }, [stream])

  useEffect(() => {
    LoadPoseNet(config)
      .then((net)=>{
        setposenet(net)
      })

    return () => setposenet(undefined)
  }, [config])

  // const pose = await guiState.net.estimatePoses(video, {
  //   flipHorizontal: flipPoseHorizontal,
  //   decodingMethod: 'single-person'
  // });
  // poses = poses.concat(pose);
  // minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
  // minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;

  return (
    <div>
      {
        videoStream ? (
          <p>PoseNet Active</p>
        ) : null
      }      
    </div>
  )
}