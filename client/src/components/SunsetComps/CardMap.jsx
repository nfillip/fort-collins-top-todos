//react imports
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {useNavigate, useLocation} from "react-router-dom"

//MUI imports
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Grid from '@mui/material/Grid';
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
//local imports
import SaveButton from "./SaveButton";
import UpVoteButton from "./UpVoteButton";
import Auth from "../../utils/auth";
import { ALL_LOCATIONS, SUNSET_LOCATIONS } from "../../utils/queries";
import { UPVOTE_LOCATION, REMOVE_VOTE_LOCATION } from "../../utils/mutations";
import Blog from "./Blog"
import SingleCard from "./SingleCard"
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

export default function CardMap({data, cat}) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();
    const titleLine = `BEST ${cat}S`.toUpperCase()
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
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    return (
      <>
  <div className = "pageBackground">
      <Typography className = "pageTitle" sx = {{ml:5, mb:0, color: "white", fontSize: {xs: "2rem", sm: "3rem", lg: "3rem"}}}>{titleLine}</Typography>
      <Typography className = "pageTitle" sx = {{ml:5, mb:2, color: "white", fontSize: {xs: "1.5rem", sm:"2.5rem", lg: "2.5rem"}}}>Fort Collins</Typography>
   <Grid container spacing={2}  sx = {{border: '.2rem solid pink', paddingTop: 0}}>
         {data.map((location, index) => (
          <Grid item key = {index} xs={12} md={4} lg = {3} sx = {{display: "flex", border: '.2rem solid green', justifyContent: 'center', p: 2}}>
             <SingleCard location = {location} index = {index} cat = {cat} />
          </Grid>
     ))}
   </Grid>
   </div>
             
     </>
    )
}