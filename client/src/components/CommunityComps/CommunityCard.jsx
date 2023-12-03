//react imports
import React from "react";
import { useMutation } from "@apollo/client";
//MUI imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import PendingIcon from "@mui/icons-material/Pending";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
//local imports
import Auth from "../../utils/auth";
import {
  SEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  REMOVE_FRIEND_REQUEST,
  REMOVE_FRIEND,
} from "../../utils/mutations";

export default function CommunityCard({ user, index, refetchCommunity }) {
  // useMutations
  const [sendRequest] = useMutation(SEND_FRIEND_REQUEST);
  const [acceptRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  const [removeRequest] = useMutation(REMOVE_FRIEND_REQUEST);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const theme = useTheme();

  let buttonStyler = 0;

  //send friend request
  const sendFriendRequest = async () => {
    console.log("sending request");
    const sendingRequest = await sendRequest({
      variables: {
        otherId: user._id,
      },
    });
    refetchCommunity();
  };

  //confirm removing friend
  const confirmAlert = () => {
    swal
      .fire({
        title: "Are you sure you want to remove friend?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleRemoveFriend();
          swalWithBootstrapButtons.fire({
            title: "Removed Friend",
            timer: 1500,
            icon: "success",
            showConfirmButton: false,
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  //remove friend request
  const removeFriendRequest = async () => {
    console.log("removing request");
    const removingRequest = await removeRequest({
      variables: {
        otherId: user._id,
      },
    });
    refetchCommunity();
  };

  //accept friend request
  const acceptFriendRequest = async () => {
    console.log("sending reqeust");
    const acceptF = await acceptRequest({
      variables: {
        otherId: user._id,
      },
    });
    refetchCommunity();
  };

  //remove friend
  const handleRemoveFriend = async () => {
    console.log("removing friend");
    const removingFriend = await removeFriend({
      variables: {
        otherId: user._id,
      },
    });
    refetchCommunity();
  };

  //determine which card icon to style card with
  if (user.friends.find((o) => o._id === Auth.getProfile().data._id)) {
    buttonStyler = 1;
  } else if (
    user.friendRequests.find((o) => o._id === Auth.getProfile().data._id)
  ) {
    buttonStyler = 2;
  } else if (
    user.friendsYouRequested.find((o) => o._id === Auth.getProfile().data._id)
  ) {
    buttonStyler = 3;
  } else {
    buttonStyler = 4;
  }
  return (
    <Card sx={{ width: 250 }} key={index}>
      <CardHeader
        title={user.username}
        action={
          buttonStyler === 1 ? (
            <HowToRegIcon sx={{ color: "green" }} />
          ) : buttonStyler === 2 ? (
            <PendingIcon sx={{ color: "gray" }} />
          ) : buttonStyler === 3 ? (
            <NewReleasesIcon sx={{ color: "red" }} />
          ) : (
            <PersonAddIcon sx={{ color: "secondary.light" }} />
          )
        }
      />
      <CardMedia
        component="img"
        height="255"
        image={user.profilePicURL}
        alt="Paella dish"
      />
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        {buttonStyler === 1 ? (
          <Button
            variant="contained"
            sx={{ background: "green" }}
            onClick={confirmAlert}
          >
            Your Friend
          </Button>
        ) : buttonStyler === 2 ? (
          <Button
            variant="contained"
            sx={{ background: "gray" }}
            onClick={removeFriendRequest}
          >
            Request Pending
          </Button>
        ) : buttonStyler === 3 ? (
          <Button
            sx={{ background: "purple" }}
            variant="contained"
            onClick={acceptFriendRequest}
          >
            Accept Friend Request
          </Button>
        ) : (
          <Button
            color="primary"
            sx={{ bgcolor: "secondary.light" }}
            variant="contained"
            onClick={sendFriendRequest}
          >
            Send Friend Request
          </Button>
        )}
      </Box>
    </Card>
  );
}
