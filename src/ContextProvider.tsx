import React, { Component } from 'react'

import { 
  PoseNetArchitecture, 
  PoseNetOutputStride, 
  InputResolution, 
  PoseNetQuantBytes 
} from '@tensorflow-models/posenet/dist/types'

const _istate = {
  user: String('Nobody'),
  coinCount: 100,
  CAMERA_CONFIG: {
    audio: true,
    video: {
      facingMode: 'user',
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 }
    }
  },
  POSENET_MODEL_CONFIG: {
    architecture: 'ResNet50' as PoseNetArchitecture,
    outputStride: 32 as PoseNetOutputStride,
    inputResolution: 250 as InputResolution,
    quantBytes: 1 as PoseNetQuantBytes
  }
}

export const AppContext = React.createContext({ 
  state: _istate,
  actions: {
    setPosenetModelConfig: function (args:object) {}
  }
})

export default class ContextProvider extends Component {
  state = _istate

  setPosenetModelConfig(config: object) {
    let { POSENET_MODEL_CONFIG } = this.state
    POSENET_MODEL_CONFIG = { ...POSENET_MODEL_CONFIG, ...config }
    this.setState({
      POSENET_MODEL_CONFIG
    })
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: {
            setPosenetModelConfig: this.setPosenetModelConfig
          }
        }}
      >
        { this.props.children }
      </AppContext.Provider>
    )
  }
}
