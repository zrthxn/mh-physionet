import React from 'react'
import AppContext from './AppContext'

export default function ContextProvider() {
  
  return (
    <AppContext.Provider
      value={{
        user: 'Nobody'
      }}
    >

    </AppContext.Provider>
  )
}
