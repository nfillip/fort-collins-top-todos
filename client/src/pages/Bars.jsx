import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BARS_LOCATIONS } from "../utils/queries";
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
import Auth from "../utils/auth";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import SaveButton from "../components/SunsetComps/SaveButton";
import UpVoteButton from "../components/SunsetComps/UpVoteButton";
import CardMap from "../components/SunsetComps/CardMap"

export default function Bars() {
  const cat = "bar";

  const { data, loading, error, refetch } = useQuery(BARS_LOCATIONS,{
    fetchPolicy: 'network-only'
  });

  if (loading) return <span>...loading</span>;
  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }
  return (
    <>
      <div>Best Bars in Fort Collins</div>
      <CardMap data = {data.barsLocations} cat = {cat} />
    </>
  );
}
