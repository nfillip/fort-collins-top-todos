import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        SignUp
      </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up Here!</DialogTitle>
        <DialogContent>
        <div>
      <TextField 
        id="outlined-basic"
        label="Username" 
        variant="outlined" />
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
        label="Email" 
        variant="outlined" />
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
        variant="outlined" />
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
          <Button onClick={handleClose}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}