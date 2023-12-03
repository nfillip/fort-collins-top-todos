//react imports
import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
//local imports
import { LOGIN, CREATE_USER } from "../../utils/mutations.js";
import Auth from "../../utils/auth";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validators.js";
//MatUI imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
//Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

export default function LoginModal({ refetchHeader }) {
  //useStates
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [logOrSign, setLogOrSign] = useState("login");
  const [imageURL, setImageURL] = useState("/broken-image.jpg");
  const [imageID, setImageID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [unErrorMessage, setUnErrorMessage] = useState("");
  //useMutations
  const [login] = useMutation(LOGIN);
  const [signUp] = useMutation(CREATE_USER);
  //useEffect
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
          console.log(result.info);
          setImageURL(result.info.secure_url);
          setImageID(result.info.public_id);
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

  const handleKeyDown = (e) => {
    console.log(e.code);
    if (e.code === "Enter" && logOrSign === "login") {
      handleLogin();
    } else if (e.code === "Enter" && logOrSign === "signup") {
      handleLogin(e);
    } else {
      e.stopPropagation(e);
    }
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
  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      handleClose();
      Swal.fire({
        title: "Welcome Back!",
        text: "You're logged in'!",
        icon: "success",
      });
      console.log("login success!");
      Auth.login(data.login.token);
      refetchHeader();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const { data } = await signUp({
          variables: {
            username: username,
            email: email,
            password: password,
            profilePic: imageID,
            profilePicURL: imageURL,
          },
        });
        Auth.signUp(data.createUser.token);
        Swal.fire({
          title: `Welcome ${username}!`,
          text: "You're signed in'!",
          icon: "success",
        });
        refetchHeader();
        handleClose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleInputChange = async (e) => {
    const { target } = e;
    const inputType = target.type;
    const inputValue = target.value;
    if (inputType === "email") {
      setEmail(inputValue);
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
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login/SignUp
      </Button>
      <Dialog open={open} onClose={handleClose} onKeyDown={handleKeyDown}>
        {logOrSign === "login" ? (
          <>
            <div>
              <Button variant="contained" onClick={() => setLogOrSign("login")}>
                Login
              </Button>
              <Button variant="outlined" onClick={() => setLogOrSign("signup")}>
                Signup
              </Button>
            </div>
            <DialogTitle>Login Here!</DialogTitle>
            <DialogContent>
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
              <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
          </>
        ) : (
          <>
            {" "}
            <div sx={{ justifyContent: "center" }}>
              <Button variant="outlined" onClick={() => setLogOrSign("login")}>
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => setLogOrSign("signup")}
              >
                Signup
              </Button>
            </div>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                borderColor: "solid red",
              }}
            >
              <DialogTitle sx={{ pl: 0 }}>Sign Up Here!</DialogTitle>
              <IconButton
                onClick={() => widgetRef.current.open()}
                sx={{ p: 0 }}
              >
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
              <Button onClick={handleSignup}>Sign Up</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
