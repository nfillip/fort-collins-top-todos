//react imports
import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
//MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
//local imports
import { ADD_BLOG_POST } from "../../utils/mutations";
import Auth from "../../utils/auth";
import EditLocationModal from "./EditLocModal";

//Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

//Export function
export default function Blog({ location, refetchPageLocs }) {
  //useStates
  const [newBlog, setNewBlog] = useState("");
  const [open, setOpen] = useState(false);
  const [newPhotoID, setNewPhotoID] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  //useMutations
  const [addPost] = useMutation(ADD_BLOG_POST);
  const handleClickOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };
  //cloudinary widget
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
          setNewPhotoURL(result.info.secure_url);
          setNewPhotoID(result.info.public_id);
          handlePushImageToLocation();
        }
      }
    );
  });
  // close modal
  const handleClose = () => {
    setOpen(false);
  };

  //post to blog
  const handleBlogPost = async () => {
    try {
      if (Auth.loggedIn()) {
        const addNewPost = await addPost({
          variables: {
            locationId: location._id,
            messageText: newBlog,
          },
        });
        if (addNewPost) {
          Swal.fire({
            icon: "success",
            title: "Post Added",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        refetchPageLocs();
        handleClose();
        setNewBlog("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Only logged in users can save locations!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // grab text field value for blog post
  const handleBlogInputChange = (e) => {
    const { target } = e;
    setNewBlog(target.value);
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        {location.blog.toReversed().map((blogMessage, index) => (
          <>
            {blogMessage.user ? (
              <>
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    border: ".1rem solid purple",
                    width: "100%",
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ mr: 1 }}
                      src={blogMessage.user.profilePicURL}
                    />
                    <Typography>
                      {blogMessage.user.username} ({blogMessage.createdAt}){" "}
                    </Typography>
                  </Box>
                  <Typography sx={{ m: 1 }}>
                    {blogMessage.messageText}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography key={index}>
                {blogMessage.messageText}
                {blogMessage.createdAt}
              </Typography>
            )}
          </>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Post to Blog
        </Button>
        <EditLocationModal id={location._id} />
      </Box>
      <Dialog open={open} onClose={handleClose} onClick={preventBubbling}>
        <DialogTitle>Post to Blog</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              value={newBlog}
              onChange={handleBlogInputChange}
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
