import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  Box,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  headline: {
    fontSize: '24px',
    paddingBottom: theme.spacing(3),
  },
}))

const LinksList = ({ links }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  const handleClick = (e) => {
    setOpen(!open)
  }

  return (
    <>
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
        <ListItem selected={open} button onClick={handleClick}>
          <ListItemText primary='Links' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {links.length ? (
              links.map((link) => {
                return (
                  <Box component='div' key={link}>
                    <ListItem
                      className={classes.nested}
                      component='a'
                      href={link.href}
                      target='_blank'
                    >
                      <ListItemText primary={link.text} />
                    </ListItem>
                    <Divider />
                  </Box>
                )
              })
            ) : (
              <ListItem className={classes.nested}>
                <ListItemText primary='No headlines found' />
              </ListItem>
            )}
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default LinksList
