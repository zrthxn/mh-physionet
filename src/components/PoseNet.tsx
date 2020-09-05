import React, { useEffect, useState, useContext } from 'react'
import { load as LoadPoseNet, PoseNet as P } from '@tensorflow-models/posenet'

import { StreamInputProps } from './Camera'
import { AppContext } from '../ContextProvider'

export const PoseNet: React.FC<StreamInputProps> = ({ stream }) => {
  const [posenet, setposenet] = useState<P>()
  const [videoStream, setVideoStream] = useState(new MediaStream())

  const context = useContext(AppContext)
  
  useEffect(()=>{
    setVideoStream(stream)
  }, [stream, stream.active])

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])
  
  LoadPoseNet(context.state.POSENET_MODEL_CONFIG)
    .then((net)=>{
      setposenet(net)
    })

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