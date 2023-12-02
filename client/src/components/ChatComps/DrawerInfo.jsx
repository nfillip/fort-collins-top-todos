//react imports
import * as React from 'react';
import { useQuery, useMutation } from "@apollo/client";
//mui imports
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
//local imports
import {QUERY_SELF_PROFILE} from "../../utils/queries"
import Auth from "../../utils/auth";
import "../../styles/custom.css"

export default function DrawerInfo({matches, activeChat, setActiveChat}) {

  const handleActive = (matchId) => {
    setActiveChat(matchId)
    console.log()
  }
    return(
        <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem  key="title" disablePadding> 
          <ListItemText primary= "CHAT WITH FRIENDS" />
          </ListItem>
      </List>
      <Divider />
      <List>
        {matches.map(({matchId, username, profilePicURL, match}) => (
          <ListItem  className = {matchId == activeChat? "activeChat" : "inactiveChat"}  key={matchId} disablePadding>
            <ListItemButton onClick = {() => handleActive(matchId)}>
              <ListItemIcon>
              <Avatar src = {profilePicURL} />
              </ListItemIcon>
              <ListItemText primary={username} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

    </div>
    )
}