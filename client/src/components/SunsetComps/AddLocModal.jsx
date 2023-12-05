//react imports
import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";

//MUI imports
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
//local imports
import SaveButton from "./SaveButton";
import UpVoteButton from "./UpVoteButton";
import Auth from "../../utils/auth";
import { CREATE_LOCATION } from "../../utils/mutations";
import Blog from "./Blog";
import SingleCard from "./SingleCard";
//Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

export default function AddLocationModal({refetchPageLocs}) {
  //location build useState
  const [open, setOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCategory, setLocationCategory] = useState([]);
  const [locationImageID, setLocationImageID] = useState("");
  const [locationImageURL, setLocationImageURL] = useState("");
  //popper useState
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [placement, setPlacement] = useState("top");
  //useMutation
  const [createLocation] = useMutation(CREATE_LOCATION);

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
          setLocationImageURL(result.info.secure_url);
          setLocationImageID(result.info.public_id);
        }
      }
    );
  });

  //handle modal form
  const handleLocNameChange = (e) => {
    setLocationName(e.target.value);
  };
  const handleLocDescriptionChange = (e) => {
    setLocationDescription(e.target.value);
  };
  const handleLocAddressChange = (e) => {
    setLocationAddress(e.target.value);
  };
  const handleLocCategoryChange = (e) => {
    if (e.target.checked) {
      let temp = locationCategory;
      temp.push(e.target.value);
      setLocationCategory(temp);
      console.log(locationCategory);
    } else {
      let temp = locationCategory;
      let index = temp.indexOf(e.target.value);
      temp.splice(index, 1);
      setLocationCategory(temp);
      console.log(locationCategory);
    }
  };
  //add location to database
  const handleAddLocation = async (e) => {
    if (
      locationName === "" ||
      locationDescription === "" ||
      locationAddress === "" ||
      locationCategory.length === 0 ||
      locationImageURL === ""
    ) {
      setAnchorEl(e.currentTarget);
      setOpenPopper(!openPopper);
      setPlacement("top");
      setTimeout(() => {
        setOpenPopper(false);
      }, 2000);
    } else {
      const addingLoc = await createLocation({
        variables: {
          locationName: locationName,
          address: locationAddress,
          description: locationDescription,
          categories: locationCategory,
          imagesUrl: locationImageURL,
          imagesId: locationImageID,
        },
      });
      if (addingLoc) {
        console.log("added location");
        refetchPageLocs();
        handleClose();
        swal.fire({
          title: "Location Added!",
          timer: 1500,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        console.log("failed");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    if (!Auth.loggedIn()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Only logged in users can add locations!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ height: 50,ml:5,mb:1,mr:5, mt: {xs: 0, sm: 0 , md: 5, lg:5} }}
      >
        Add A Location
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderColor: "solid red",
          }}
        >
          <DialogTitle sx={{ pl: 0 }}>Add New Location</DialogTitle>
          <IconButton onClick={() => widgetRef.current.open()} sx={{ p: 0 }}>
            {locationImageURL === "" ? (
              <AddPhotoAlternateIcon color="primary" />
            ) : (
              <Avatar src={locationImageURL} />
            )}
          </IconButton>
        </Typography>

        <DialogContent>
          <div>
            <TextField
              id="filled-basic"
              label="Location Name"
              variant="filled"
              value={locationName}
              type="text"
              onChange={handleLocNameChange}
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Description"
              variant="filled"
              value={locationDescription}
              type="text"
              onChange={handleLocDescriptionChange}
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Address"
              variant="filled"
              value={locationAddress}
              type="text"
              onChange={handleLocAddressChange}
            />
          </div>
          <div>
            <FormGroup sx={{ marginTop: "10px" }}>
              Categories
              <FormControlLabel
                control={<Checkbox />}
                label="Sunset"
                value="sunset"
                onChange={handleLocCategoryChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Hike"
                value="hike"
                onChange={handleLocCategoryChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Bar"
                value="bar"
                onChange={handleLocCategoryChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Restaurant"
                value="restaurant"
                onChange={handleLocCategoryChange}
              />
            </FormGroup>
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
                    Fill all fields
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Button onClick={handleAddLocation}>Add Location</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
