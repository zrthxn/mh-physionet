import React from 'react'

export const AppContext = React.createContext({
  state: {
    user: String(),
    POSENET_MODEL_CONFIG: {
      arch: 'ResNet50'
    }
  },
  actions: {
    setPosenetModelConfig: function (args:object) {}
  }
})

export default AppContext