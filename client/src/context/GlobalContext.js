import React, { useState, createContext } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [urlToScrape, setUrlToScrape] = useState('')

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setLoading,
        urlToScrape,
        setUrlToScrape
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
