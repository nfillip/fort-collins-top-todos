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
  const [numLikes, setNumLikes] = useState(location.sunsetLikes.length)
  //useMutations
  const [addUpVote] = useMutation(UPVOTE_LOCATION);
  const [removeUpVote] = useMutation(REMOVE_VOTE_LOCATION);
  //useQueries
  const { data, loading, error, refetch } = useQuery(QUERY_SELF_PROFILE, {
    onCompleted: (data) => {
      let isSaved = false;
      for (let i = 0; i < location.sunsetLikes.length; i++) {
        if (data.me._id == location.sunsetLikes[i]._id) {
          isSaved = true;
        }
      }
      isSaved ? setActive(true) : setActive(false);
    },
  });

  //click functions
  //save location
  const handleUpVote = async () => {
    try {
    console.log(location._id)
      const upVote = await addUpVote({
        variables: {
          locationId: location._id,
          cat: cat,
        },
      });
      setActive(!active);
      setNumLikes(numLikes+1)
      console.log("location Upvoted");
    } catch (err) {
      console.error(err);
    }
  };
  const handleRemoveVote = async () => {
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

