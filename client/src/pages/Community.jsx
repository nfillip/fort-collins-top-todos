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
import Grid from '@mui/material/Grid';
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
import CommunityCard from "../components/CommunityComps/CommunityCard"
import {ALL_USERS} from "../utils/queries"
import LoadingComp from "../components/LoadingComp/LoadingComp"
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

export default function Community() {
      const theme = useTheme();
      const [activeStep, setActiveStep] = useState(0);
      const [expanded, setExpanded] = React.useState(false);
      const navigate = useNavigate();

      const { data, loading, error, refetch } = useQuery(ALL_USERS,{
        fetchPolicy: 'network-only',
        // onCompleted: (data) => {
        //     console.log(data)
        // }
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
      if (loading) return <LoadingComp />;
      if (error) {
        return <div>{error.message}</div>;
      }
    return (
        <div className = "pageBackground">
          <Typography sx = {{ml:5, mb:0, color: "white", fontSize: {xs: "2rem", sm: "3rem", lg: "3rem"}}}>Meet the Foco Fun Community</Typography>
          <Grid container spacing={2}  sx = {{paddingTop: 0}}>
          {data.users.map((user, index) => (
            <Grid item key = {index} xs={12} md={4} lg = {3} sx = {{display: "flex", justifyContent: 'center', p: 2}}>
              <CommunityCard user = {user} index = {index} refetchCommunity = {refetch} />
            </Grid>
          
          ))}
          </Grid>
        </div>

    )
}