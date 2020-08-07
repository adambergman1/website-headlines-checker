import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/layouts/Header'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

import GlobalContextProvider from './context/GlobalContext'
import { Container } from '@material-ui/core'
import Website from './components/Website'
import Search from './components/Search'

function App () {
  return (
    <GlobalContextProvider>
      <Router>
        <div className='App'>
          <Header />
          <Container className='container' maxWidth='sm'>
            <Switch>
              <Route
                path='/'
                render={() => (
                  <>
                    <Search />
                    <Route
                      exact
                      path='/'
                      render={(props) => <Home {...props} />}
                    />
                    <Route
                      path='/:query'
                      render={(props) => <Website {...props} />}
                    />
                  </>
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
        <></>
      </Router>
    </GlobalContextProvider>
  )
}

export default App
