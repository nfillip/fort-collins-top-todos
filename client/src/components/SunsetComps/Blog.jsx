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

//local imports
import { ADD_BLOG_POST } from "../../utils/mutations";
export default function Blog() {
    const [newBlog, setNewBlog] = useState("")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleBlogPost = () => {

    }

    const handleBlogInputChange = (e) => {
    setNewBlog(newBlog)
    }
  return (
    <>
    <Box sx = {{display: "flex", flexDirection: "column", alignItems: "start"}}>
        <Typography> adsfasd</Typography>
        <Typography>adsfasd</Typography>
    </Box>
        
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    </Box>
      <Button variant="contained" onClick={handleClickOpen}>
        Post to Blog
      </Button>
      <Dialog open={open} onClose={handleClose}>
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