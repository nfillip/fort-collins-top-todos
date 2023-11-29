//react imports
import * as React from 'react';
import { useQuery, useMutation } from "@apollo/client";
//mui imports
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
//local imports
import Auth from "../../utils/auth"
import { CREATE_MESSAGE } from "../../utils/mutations";
import {QUERY_MATCH_MESSAGES} from "../../utils/queries"

export default function ActiveChat({activeChat}) {

    //useStates
const [textMessage, setTextMessage] = React.useState("")
//useQuery
let { data, loading, err } = useQuery(QUERY_MATCH_MESSAGES, {
    variables: {
        matchId: activeChat,
    },
    // pollInterval: 500
});
//useMutations
const [createMessage] = useMutation(CREATE_MESSAGE);

    const handleSend = (e) => {
        e.preventDefault();
		createMessage({
			variables: { messageText: textMessage, matchId: activeChat},
		});
		setTextMessage("");
    }
  
    const handleTextChange = (e) => {
        const {target} = e;
        const inputValue = target.value;
        setTextMessage(inputValue)
    }
    console.log(Auth.getProfile())

    // const messages = data?.oneMatch.matches.map((match)=> {
    //     const {_id, user1,user2, messages} = match
    //     const matchId = _id;
    //     const selfId = Auth.getProfile().data._id;
    //     let username, profilePicURL;
    //     if (user1._id === selfId) {
    //         username = user2.username;
    //         profilePicURL = user2.profilePicURL
    //     } else if (user2._id === selfId) {
    //         username = user1.username;
    //         profilePicURL = user1.profilePicURL;
    //     } else {
    //         throw new Error("Neither user in match is the current user");
    //     }
    //     return {match, matchId, username, profilePicURL, messages}
    // }) || [];

    if (activeChat == "") return "Select a conversation...";

	if (loading) return <span className="loading loading-ball loading-lg"></span>;
	if (err) return `Error! ${err}`;
    let selfId = Auth.getProfile().data._id
    return (
        <>
        {data.oneMatch.user1._id == selfId? (<Typography>{data.oneMatch.user2.username}</Typography>) : (<Typography>{data.oneMatch.user1.username}</Typography>)}
        <Box sx = {{border: ".2rem solid purple"}}>
            {data.oneMatch.messages.map((message) => (
                <>
                <Box sx = {{display: "flex", width: 1 }} className = {message.user._id == selfId ? "myText": "theirText"}>
                    <Box sx = {{width: "auto", border: ".2rem solid green"}}> {message.messageText}</Box>
                </Box>
                </>
            ))}
        </Box>
        <TextField value = {textMessage} id="outlined-basic" label="Chat" variant="outlined" onChange = {handleTextChange}/>
        <Button variant="contained" onClick = {handleSend}>Send</Button>
        </>
    )
}