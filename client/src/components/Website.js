import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import HeadlineList from './HeadlineList'
import LinkList from './LinksList'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import {
  CircularProgress,
  List,
  ListSubheader,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  headline: {
    fontSize: '24px',
    paddingBottom: theme.spacing(3),
  },
}))

const Website = () => {
  const [elements, setElements] = useState({})
  const [hasError, setError] = useState(false)
  const { isLoading, setLoading } = useContext(GlobalContext)
  const query = window.location.pathname.substring(1)

  const classes = useStyles()

  useEffect(() => {
    if (query) {
      setLoading(true)
      getWebsiteElements()
        .then((result) => {
          console.log(result.code)
          if (result.code === 'ENOTFOUND') {
            setError(true)
            setLoading(false)
          } else {
            setElements({ headlines: result.headlines, links: result.links })
            setLoading(false)
            setError(false)
          }
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }
  }, [query])

  useEffect(() => {
    if (elements) {
      console.log(elements.links)
    }
  }, [elements])

  const getWebsiteElements = async () => {
    const result = await window.fetch(`/api/scrape/${query}`)
    const json = await result.json()
    return json
  }
  return (
    <div className={classes.root}>
      {isLoading && _.isEmpty(elements) ? (
        <Grid align='center'>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : hasError ? (
        <p>
          <b>{query}</b> is not a valid domain name
        </p>
      ) : elements.headlines && elements.links ? (
        <>
          <Typography align='center'>{query}</Typography>
          <List
            component='div'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                className={classes.headline}
                component='div'
                align='center'
              >
                Headlines
              </ListSubheader>
            }
          >
            {Object.keys(elements.headlines).map((headline) => (
              <HeadlineList
                key={headline}
                headline={headline}
                headlines={elements.headlines[headline]}
              />
            ))}
          </List>
          <LinkList links={elements.links} />
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default Website
