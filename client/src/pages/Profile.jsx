//react imports
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {useNavigate} from "react-router-dom"

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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
//local imports
import EditProfileModal from "../components/ProfileComps/EditProfileModal"
import {QUERY_SELF_PROFILE} from "../utils/queries"
import {
  SEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  REMOVE_FRIEND_REQUEST,
  REMOVE_FRIEND,
} from "../utils/mutations";
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
      const [expanded, setExpanded] = React.useState(false);
      //useMutations
      const [acceptRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
      const [removeRequest] = useMutation(REMOVE_FRIEND_REQUEST);
      const [removeFriend] = useMutation(REMOVE_FRIEND);  
  //useNavigate
  const navigate = useNavigate();
      const { error, loading, data, refetch } = useQuery(QUERY_SELF_PROFILE, {
        fetchPolicy: 'network-only'
      });
      
        const handleExpandClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          setExpanded(!expanded);
        };
      
        const confirmAlert = (id) => {
          swal.fire({
            title: "Are you sure you want to remove friend?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              handleRemoveFriend(id);
              swalWithBootstrapButtons.fire({
                title: "Removed Friend",
                timer: 1500,
                icon: "success",
                showConfirmButton: false
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                icon: "error",
                showConfirmButton: false,
                timer: 1000
              });
            }
          });
        }
        const removeFriendRequest = async (id) => {
          const removingRequest = await removeRequest({
            variables: {
              otherId: id,
            },
          });
          refetch();
        };
      
        const acceptFriendRequest = async (id) => {
          const acceptF = await acceptRequest({
            variables: {
              otherId: id,
            },
          });
          refetch();
        };
      
        const handleRemoveFriend = async (id) => {
          const removingFriend = await removeFriend({
            variables: {
              otherId: id,
            },
          });
          refetch();
        };

        const goToSaved = () => {
          navigate('/saved')
        }
      if (loading) {
        return <span className="loading loading-ball loading-lg"></span>;
      }
      if (error) {
        return <div>{error.message}</div>;
      }
    return (
        <div className = "pageBackground">
          <Box sx = {{display: "flex", justifyContent: "center", alignItems: "center", p:5}}>
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
          <Typography color="text.secondary">
            {data.me.email}
          </Typography>
          <Button variant = "none" sx = {{m:0, p:0}}onClick = {goToSaved} >Go To Saved Locations</Button>
        </CardContent>
        <CardActions disableSpacing>
        See your community below:
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
              <>
              <Box key = {index} sx = {{display: "flex", flexDirection: "row", alignItems:"center", my:1}}>
              <IconButton onClick = {() => confirmAlert(friend._id)}><PersonRemoveIcon/></IconButton>
              <Avatar src = {friend.profilePicURL} sx = {{mr:1}}/>
              <Typography>{friend.username}</Typography>
              </Box>
              </>
            ))}
            </Box>
            <Box>Your Received Requests
            {data.me.friendRequests.map((friend,index) => (
              <Box key = {index} sx = {{display: "flex", flexDirection: "row", alignItems:"center", my:1}}>
                <IconButton   onClick = {() => acceptFriendRequest(friend._id)} ><PersonAddIcon/></IconButton>
                <Avatar src = {friend.profilePicURL} sx = {{mr:1}}/>
              <Typography>{friend.username}</Typography>
              </Box>
            ))}
            </Box>
            <Box> Your Sent Requests
            {data.me.friendsYouRequested.map((friend,index) => (
              <Box key = {index} sx = {{display: "flex", flexDirection: "row", alignItems:"center", my:1}}>
                <IconButton onClick = {() => removeFriendRequest(friend._id)}><CancelIcon /></IconButton>
                <Avatar src = {friend.profilePicURL} sx = {{mr:1}}/>
              <Typography>{friend.username}</Typography>
              </Box>
            ))}
            </Box>
          </CardContent>
        </Collapse>
      </Card>
      </Box>
      </div>
    )
}