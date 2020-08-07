import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
}))

const Search = ({ history }) => {
  const [query, setQuery] = useState('')
  const [isValidUrl, setValidUrl] = useState(true)

  const classes = useStyles()

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query !== '') {
      const url = removeUrlPrefix(query)
      history.push(`/${url}`)
    } else {
      setValidUrl(false)
    }
  }

  const removeUrlPrefix = (url) => {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
  }

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container align='center' justify='space-between'>
          <TextField
            fullWidth
            type='url'
            required
            onChange={handleChange}
            value={query}
            label='Enter URL'
            error={!isValidUrl}
            helperText={
              !isValidUrl &&
              'Please enter a valid domain name, e.g. example.com'
            }
            InputProps={{
              endAdornment: (
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              ),
            }}
          />
        </Grid>
      </form>
    </div>
  )
}

export default withRouter(Search)
