//react imports
import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
//mui imports
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
//local imports
import "../../styles/custom.css";

export default function DrawerInfo({ matches, activeChat, setActiveChat }) {
  // determine which chat to display
  const handleActive = (matchId) => {
    setActiveChat(matchId);
    console.log();
  };
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="title" disablePadding>
          <ListItemText primary="CHAT WITH FRIENDS" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {matches.map(({ matchId, username, profilePicURL, match }) => (
          <ListItem
            className={matchId == activeChat ? "activeChat" : "inactiveChat"}
            key={matchId}
            disablePadding
          >
            <ListItemButton onClick={() => handleActive(matchId)}>
              <ListItemIcon>
                <Avatar src={profilePicURL} />
              </ListItemIcon>
              <ListItemText primary={username} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
