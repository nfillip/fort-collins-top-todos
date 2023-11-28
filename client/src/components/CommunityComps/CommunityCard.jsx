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
import Auth from "../../utils/auth";

export default function CommunityCard({user, index}) {
    const theme = useTheme();
    let buttonStyler = 0
if(user.friends.indexOf(Auth.getProfile().data._id)){
    buttonStyler = 1
}else if (user.friendRequests.indexOf(Auth.getProfile().data._id)){
    buttonStyler = 2
}
console.log(user)
    return (
            <Card sx={{ maxWidth: 345 }} key = {index}>
            <CardHeader
            //   action={<EditProfileModal refetch = {refetch} profilePicURL = {user.profilePicURL} />}
              title= {user.username}
            />
            <CardMedia
              component="img"
              height="255"
              image= {user.profilePicURL}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </CardContent>
            <Button variant="contained">Send Friend Request</Button>
            
          </Card>

    )
}