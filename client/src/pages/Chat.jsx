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
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
//local imports
import {QUERY_SELF_PROFILE} from "../utils/queries"
import Auth from "../utils/auth";
import DrawerInfo from "../components/ChatComps/DrawerInfo.jsx"
import ActiveChat from "../components/ChatComps/ActiveChat.jsx"
const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
//useStates
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); 
  const [activeChat, setActiveChat] = React.useState("")
  //useQueries
  const { error, loading, data, refetch } = useQuery(QUERY_SELF_PROFILE, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if(data.me.matches.length > 0){
          setActiveChat(data.me.matches[0]._id)
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No Friends Yet!",
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 const matches = data?.me.matches.map((match)=> {
    const {_id, user1,user2, messages} = match
    const matchId = _id;
    const selfId = Auth.getProfile().data._id;
    let username, profilePicURL;
    if (user1._id === selfId) {
        username = user2.username;
        profilePicURL = user2.profilePicURL
    } else if (user2._id === selfId) {
        username = user1.username;
        profilePicURL = user1.profilePicURL;
    } else {
        throw new Error("Neither user in match is the current user");
    }
    return {match, matchId, username, profilePicURL, messages}
}) || [];
  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;
  if (loading) {
    return <span className="loading loading-ball loading-lg"></span>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
    <div className = "chatBackground">
    <Box sx={{ display: 'flex',height: "100%" }}>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
            <DrawerInfo matches = {matches} activeChat = {activeChat} setActiveChat = {setActiveChat} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerInfo matches = {matches} activeChat = {activeChat} setActiveChat = {setActiveChat} />
        </Drawer>
      </Box> <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 0, display: { sm: 'none' } }}
          >
            <KeyboardDoubleArrowRightIcon sx = {{color: "white"}} />
          </IconButton>
      <Box
        component="main"
        sx={{ height: "80%", flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
          {activeChat !== "" ? <ActiveChat activeChat = {activeChat}/> : <></>}
      </Box>
    </Box>
    </div>
    </>
  );
}





