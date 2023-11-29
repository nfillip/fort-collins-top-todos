//react imports
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {useNavigate, useLocation} from "react-router-dom"

//MUI imports
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
//local imports
import SaveButton from "../components/SunsetComps/SaveButton";
import UpVoteButton from "../components/SunsetComps/UpVoteButton";
import Auth from "../utils/auth";
import EditProfileModal from "../components/ProfileComps/EditProfileModal"
import {QUERY_SELF_PROFILE} from "../utils/queries"
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Profile() {
      const theme = useTheme();
      const [activeStep, setActiveStep] = useState(0);
      const [expanded, setExpanded] = React.useState(false);
      const navigate = useNavigate();
  

      const { error, loading, data, refetch } = useQuery(QUERY_SELF_PROFILE, {
        fetchPolicy: 'network-only'
      });
      const handleNext = () => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
      
        const handleBack = () => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };
      
        const handleStepChange = (step) => {
          setActiveStep(step);
        };
      
        const handleExpandClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          setExpanded(!expanded);
        };
      
        const handleSingleLocation = (e, location) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(location);
          // navigate('../singlelocation')
        }
  
        const preventBubbling = (e) => {
          e.stopPropagation();
          e.preventDefault();
      }
      const openEditModal = () => {

      }
      if (loading) {
        return <span className="loading loading-ball loading-lg"></span>;
      }
      if (error) {
        return <div>{error.message}</div>;
      }
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={<EditProfileModal refetch = {refetch} profilePicURL = {data.me.profilePicURL} />}
          title= {data.me.username}
        />
        <CardMedia
          component="img"
          height="255"
          image= {data.me.profilePicURL}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.me.email}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box>Your Friends
            {data.me.friends.map((friend,index) => (
              <Typography>{friend.username}</Typography>
            ))}
            </Box>
            <Box>Your Received Requests
            {data.me.friendRequests.map((friend,index) => (
              <Typography>{friend.username}</Typography>
            ))}
            </Box>
            <Box> Your Sent Requests
            {data.me.friendsYouRequested.map((friend,index) => (
              <Typography>{friend.username}</Typography>
            ))}
            </Box>
           
          </CardContent>
        </Collapse>
      </Card>
    )
}