//react imports
import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

//MUI imports
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
//local imports
import Auth from "../../utils/auth";
import { QUERY_SELF_PROFILE } from "../../utils/queries";
import { UPVOTE_LOCATION, REMOVE_VOTE_LOCATION } from "../../utils/mutations";

export default function UpVoteButton({location,cat}) {
  //useStates
  const [active, setActive] = useState(false);
  const [numLikes, setNumLikes] = useState(0)
  //useMutations
  const [addUpVote] = useMutation(UPVOTE_LOCATION);
  const [removeUpVote] = useMutation(REMOVE_VOTE_LOCATION);
  //useQueries
  const { data, loading, error, refetch } = useQuery(QUERY_SELF_PROFILE, {
    onCompleted: (data) => {
      let isSaved = false;
      switch(cat) {
        case "sunset":
          setNumLikes(location.sunsetLikes.length)
          for (let i = 0; i < location.sunsetLikes.length; i++) {
            if (data.me._id == location.sunsetLikes[i]._id) {
              isSaved = true;
            }
          }
          break;
        case "bar":
          setNumLikes(location.barsLikes.length)
          for (let i = 0; i < location.barsLikes.length; i++) {
              if (data.me._id == location.barsLikes[i]._id) {
                isSaved = true;
              }
            }
          break;
        case "view":
          setNumLikes(location.viewsLikes.length)
          for (let i = 0; i < location.viewsLikes.length; i++) {
              if (data.me._id == location.viewsLikes[i]._id) {
                isSaved = true;
              }
            }
            break;
        case "restaurant":
          setNumLikes(location.restaurantsLikes.length)
          for (let i = 0; i < location.restaurantsLikes.length; i++) {
              if (data.me._id == location.restaurantsLikes[i]._id) {
                isSaved = true;
              }
            }
             break;
      }     
      isSaved ? setActive(true) : setActive(false);
    }
  });

  //click functions
  //save location
  const handleUpVote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if(Auth.loggedIn()){
      const upVote = await addUpVote({
        variables: {
          locationId: location._id,
          cat: cat,
        },
      });
      setActive(!active);
      setNumLikes(numLikes+1)
      console.log("location Upvoted");
      }else {
        console.log("not loggedIN")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Only logged in users can upvote!",
          showConfirmButton: false,
          timer: 2000
        });
      }
    
    } catch (err) {
      console.error(err);
    }
  };
  const handleRemoveVote = async () => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await removeUpVote({
        variables: {
          locationId: location._id,
          cat: cat,
        },
      });
      setActive(!active);
      setNumLikes(numLikes-1)
      console.log("location vote removed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {active ? (<>
        <IconButton aria-label="add to favorites" onClick={handleRemoveVote}>
          <ThumbUpIcon sx={{ color: "purple" }} />
        </IconButton>
        <Typography>{numLikes} likes</Typography>
        </>
      ) : (
        <>
        <IconButton aria-label="settings" onClick={handleUpVote}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{numLikes} likes</Typography>
        </>
      )}
    </>
  );
}

