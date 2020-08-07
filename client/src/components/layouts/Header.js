import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header = () => {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography
          align='center'
          variant='h6'
          component='h1'
          noWrap
          style={{ width: '100%' }}
        >
          Website Headline Checker
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
