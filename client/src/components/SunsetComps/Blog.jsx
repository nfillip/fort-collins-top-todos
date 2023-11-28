//react imports
import React, {useState, useRef, useEffect} from 'react'
import { useQuery, useMutation } from "@apollo/client";

//MUI imports
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from "@mui/material/Avatar";

//local imports
import { ADD_BLOG_POST } from "../../utils/mutations";
import Auth from "../../utils/auth";

//Export function
export default function Blog({location}) {
    //useStates
    const [newBlog, setNewBlog] = useState("")
    const [open, setOpen] = useState(false);
    //useMutations
    const [addPost] = useMutation(ADD_BLOG_POST);
    const handleClickOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleBlogPost = async() => {
    try{
        if(Auth.loggedIn()){
            const addNewPost = await addPost({
                variables: {
                    locationId: location._id,
                    messageText: newBlog
                }
            })
            setTimeout(handleClose, 2000)
            console.log(location)
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Only logged in users can save locations!",
                showConfirmButton: false,
                timer: 2000
              });
        }
    }catch (err) {
        console.error(err)
    }
}
    const handleBlogInputChange = (e) => {
        const {target} = e;
        setNewBlog(target.value)
    }

    const preventBubbling = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
  return (
    <>
    <Box sx = {{display: "flex", flexDirection: "column", alignItems: "start"}}>
        {location.blog.toReversed().map((blogMessage, index) => (
            <>
            {blogMessage.user ? (<><Avatar src= {blogMessage.user.profilePicURL} />
            <Typography>{blogMessage.user.username}{blogMessage.messageText}{blogMessage.createdAt}</Typography></>) : (<Typography>{blogMessage.messageText}{blogMessage.createdAt}</Typography>)}
            </>
        ))}
    </Box>
        
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    </Box>
      <Button variant="contained" onClick={handleClickOpen}>
        Post to Blog
      </Button>
      <Dialog open={open} onClose={handleClose} onClick = {preventBubbling}>
        <DialogTitle>Post to Blog</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-multiline-flexible"
            label="New Post"
            type="text"
            fullWidth
            multiline
            variant="standard"
            maxRows={4}
            value = {newBlog}
            onChange = {handleBlogInputChange}
          />
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBlogPost}>Post</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}