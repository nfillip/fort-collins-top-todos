//react imports
import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
//local imports
import { UPDATE_USER } from "../../utils/mutations.js";
import {useHeaderContext} from '../../utils/HeaderContext'
import Auth from "../../utils/auth";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validators.js";
//MUI imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
export default function EditProfileModal({ refetch, profilePicURL }) {
  //useStates
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [imageURL, setImageURL] = useState(profilePicURL);
  const [imageID, setImageID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [unErrorMessage, setUnErrorMessage] = useState("");
  const [newUserData, setNewUserData] = useState({});

  //popper
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [placement, setPlacement] = useState("top");
  //useMutations
  const [editProfile] = useMutation(UPDATE_USER);
  //useContext
  const contextObj = useHeaderContext();
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dkxtk2v4z",
    },
  });
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dkxtk2v4z",
        uploadPreset: "dogprofile_test",
      },
      async function (error, result) {
        if (result.info.public_id) {
          const newData = { ...newUserData };
          setImageURL(result.info.secure_url);
          newData.profilePicUrl = result.info.secure_url;
          setImageID(result.info.public_id);
          newData.profilePic = result.info.public_id;
          setNewUserData(newData);
        }
      }
    );
  });

  // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image(imageURL);
  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setEmail("");
    setUsername("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (
        !errorMessage &&
        !pwErrorMessage &&
        !unErrorMessage &&
        (email !== "" || password !== "" || username !== "" || imageURL !== "")
      ) {
        console.log(newUserData);
        const data = await editProfile({
          variables: {
            id: Auth.getProfile().data._id,
            ...newUserData,
          },
        });
        if(newUserData.username && newUserData.username !== "" ){
          contextObj.setHeaderProfileUsername(newUserData.username)
        }
        if(newUserData.profilePicUrl && newUserData.profilePicUrl !== ""){
          contextObj.setHeaderProfilePic(newUserData.profilePicUrl)
        }
        handleClose();
        refetch();
        setNewUserData({});
        setImageURL("");
        setImageID("");
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        setAnchorEl(e.currentTarget);
        setOpenPopper(!openPopper);
        setPlacement("top");
        setTimeout(() => {
          setOpenPopper(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleInputChange = async (e) => {
    const { target } = e;
    const inputType = target.type;
    const inputValue = target.value;
    const newData = { ...newUserData };
    if (inputType === "email") {
      setEmail(inputValue);
      newData.email = inputValue;
      setNewUserData(newData);
      if (!validateEmail(inputValue) && inputValue !== "") {
        setErrorMessage("Email is invalid");
        return;
      } else if (!validateEmail(inputValue) && inputValue === "") {
        setErrorMessage(null);
      } else {
        setErrorMessage(null);
      }
    } else if (inputType === "password") {
      setPassword(inputValue);
      newData.password = inputValue;
      setNewUserData(newData);
      if (!validatePassword(inputValue) && inputValue !== "") {
        setPwErrorMessage("Password is invalid");
        return;
      } else if (!validatePassword(inputValue) && inputValue === "") {
        setPwErrorMessage(null);
      } else {
        setPwErrorMessage(null);
      }
    } else if (inputType === "text") {
      setUsername(inputValue);
      newData.username = inputValue;
      setNewUserData(newData);
      if (!validateUsername(inputValue) && inputValue !== "") {
        setUnErrorMessage("Password is invalid");
        return;
      } else if (!validateUsername(inputValue) && inputValue === "") {
        setUnErrorMessage(null);
      } else {
        setUnErrorMessage(null);
      }
    }
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ModeEditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderColor: "solid red",
          }}
        >
          <DialogTitle sx={{ pl: 0 }}>Edit Profile</DialogTitle>
          <IconButton onClick={() => widgetRef.current.open()} sx={{ p: 0 }}>
            <Avatar src={imageURL} />
          </IconButton>
        </Typography>

        <DialogContent>
          <div>
            {!unErrorMessage ? (
              <TextField
                id="filled-basic"
                label="Username"
                variant="filled"
                value={username}
                type="text"
                onChange={handleInputChange}
              />
            ) : (
              <TextField
                error
                id="outlined-error"
                label="1 letter and >2 chars"
                variant="filled"
                value={username}
                type="text"
                onChange={handleInputChange}
              />
            )}
          </div>
          <div>
            {!errorMessage ? (
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                value={email}
                type="email"
                onChange={handleInputChange}
              />
            ) : (
              <TextField
                error
                id="outlined-error"
                label="Check Email Syntax"
                variant="filled"
                value={email}
                type="email"
                onChange={handleInputChange}
              />
            )}
          </div>
          <div>
            {!pwErrorMessage ? (
              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                type="password"
                value={password}
                onChange={handleInputChange}
              />
            ) : (
              <TextField
                error
                id="outlined-error"
                label="letters,numbers,symbol (6+char)"
                variant="filled"
                value={password}
                type="password"
                onChange={handleInputChange}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Popper
            sx={{ zIndex: "100001" }}
            open={openPopper}
            anchorEl={anchorEl}
            placement="top"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2, color: "red" }}>
                    Invalid credentials
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
