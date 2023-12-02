//react imports
import * as React from 'react';
import { useQuery, useMutation } from "@apollo/client";
//mui imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
    pollInterval: 500
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

    if (activeChat == "") return "Select a conversation...";

	if (loading) return <span className="loading loading-ball loading-lg"></span>;
	if (err) return `Error! ${err}`;
    let selfId = Auth.getProfile().data._id

    return (
        <>
        {data.oneMatch.user1._id == selfId? (<Typography >{data.oneMatch.user2.username}</Typography>) : (<Typography sx = {{color: "white", fontSize: "2rem"}}>{data.oneMatch.user1.username}</Typography>)}
        <Box sx = {{borderRadius: "10px", height: "100%", p:3}} className = "activeChatBackground">
            {data.oneMatch.messages.map((message) => (
                <>
                <Box sx = {{display: "flex", width: 1, py:1 }} className = {message.user._id == selfId ? "myText": "theirText"}>
                    <Box sx = {{width: "auto",maxWidth: "45%",overflow: "auto", height:"auto", p:1, borderRadius: 2}} className = {message.user._id == selfId ? "myBubble": "theirBubble"}> {message.messageText}</Box>
                </Box>
                </>
            ))}
        </Box>
        <Box sx = {{borderRadius: "10px", display: "flex", justifyContent: "end", alignItems: "end"}}>
        <TextField multiline maxRows = {100} sx = {{borderRadius: "10px",bgcolor: "secondary.light", width: "100%"}}value = {textMessage} id="outlined-basic" label="Chat" variant="outlined" onChange = {handleTextChange}/>
        <Button variant="contained" sx = {{width: "150px", height: "100%", maxHeight: "100px"}} onClick = {handleSend}>Send</Button>
        </Box>
        </>
    )
}