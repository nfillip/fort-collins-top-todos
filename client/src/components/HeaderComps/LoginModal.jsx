//react imports
import React, {useState} from 'react'
import { useMutation } from "@apollo/client";
//local imports
import {LOGIN} from "../../utils/mutations";
import Auth from "../../utils/auth"
import {validateEmail} from '../../utils/valemail';
import { validatePassword } from '../../utils/valpass';
//MatUI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function LoginModal() {
  //useStates
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  //useMutations
  const [login] = useMutation(LOGIN);
  
  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const {data} = await login({
        variables: {
          email,
          password,
        }
      });
      Auth.login(data.login.token);
      console.log("login success!")
      console.log(data);
      handleClose();
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login Here!</DialogTitle>
        <DialogContent>
          <div>
      <TextField 
        id="outlined-basic"
        label="Email" 
        variant="outlined"
        value = {email}
        onChange = {handleEmailChange} />
        {/* <TextField
          error
          id="outlined-error"
          label="Error"
          defaultValue="Hello World"
        /> */}
      </div>
      <div>
      <TextField 
        id="outlined-basic"
        label="Password" 
        variant="outlined"
        value = {password}
        onChange = {handlePasswordChange} />
        {/* <TextField
          error
          id="outlined-error"
          label="Error"
          defaultValue="Hello World"
        /> */}
      </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}