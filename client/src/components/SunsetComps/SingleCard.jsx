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
import EditIcon from '@mui/icons-material/Edit';
//local imports
import SaveButton from "./SaveButton";
import UpVoteButton from "./UpVoteButton";
import Auth from "../../utils/auth";
import { ALL_LOCATIONS, SUNSET_LOCATIONS } from "../../utils/queries";
import { UPVOTE_LOCATION, REMOVE_VOTE_LOCATION } from "../../utils/mutations";
import Blog from "./Blog"
import EditLocModal from "./EditLocModal"

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

export default function SingleCard({location, index, cat, refetchPageLocs}) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();

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
      }

      const preventBubbling = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
return (
    <>
    <div key = {index}>
            {location.imagesURL.length !== 1 ? (
              <Card sx={{ maxWidth: 345}} key={index}>
                <CardHeader
                  action={<SaveButton location={location} cat = {cat}/>}
                  title={location.name}
                  sx = {{height: 50}}
                />
                <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {location.imagesURL.map((step, index) => (
                      <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              height: 255,
                              display: "block",
                              maxWidth: 400,
                              overflow: "hidden",
                              width: "100%",
                            }}
                            src={step}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    sx = {{height: 30}}
                    steps={location.imagesURL.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === location.imagesURL.length - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>

                <CardContent sx = {{height: expanded?"auto":90, overflow: "auto"}} >
                  <Typography variant="body2" color="text.secondary">
                    {location.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {cat === "saved" ? <></>: <UpVoteButton location={location} cat={cat} />}
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
                    <Typography paragraph>{location.name} Blog:</Typography>
                    <Blog location = {location} />
                  </CardContent>
                </Collapse>
              </Card>
            ) : (
              <Card sx={{ maxWidth: 345 }} key = {index}>
                <CardHeader
                  action={<SaveButton location={location} cat = {cat} />}
                  title={location.name}
                  sx = {{height: 50}}
                />
                <CardMedia
                  component="img"
                  height="255"
                  image={location.imagesURL[0]}
                  alt="Paella dish"
                />
                <Box sx = {{height: 46}}></Box>
                <CardContent sx = {{height: expanded?"auto":90, overflow: "auto"}}>
                  <Typography variant="body2" color="text.secondary">
                    {location.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                {cat === "saved" ? <></>: <UpVoteButton location={location} cat={cat} />}
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
                    <Typography paragraph>{location.name} Blog:</Typography>
                    <Blog  location = {location} refetchPageLocs = {refetchPageLocs} />
                  </CardContent>
                </Collapse>
              </Card>
            )}
          </div>
    </>
)
}