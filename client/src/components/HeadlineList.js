import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  ListItemIcon,
  Divider,
  Box
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const HeadlineList = ({ headline, headlines }) => {
  const [open, setOpen] = useState(true)
  const classes = useStyles()

  const handleClick = (e) => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem selected={open} button onClick={handleClick}>
        <ListItemText primary={headline} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {headlines.length ? (
            headlines.map((value) => {
              return (
                <Box component='div' key={value}>
                  <ListItem className={classes.nested}>
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary={value} />
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
    </>
  )
}

export default HeadlineList
