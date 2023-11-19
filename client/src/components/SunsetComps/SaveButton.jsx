//react imports
import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

//MUI imports
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
//local imports
import Auth from "../../utils/auth";
import { QUERY_SELF_PROFILE } from "../../utils/queries";
import { SAVE_LOCATION, UNSAVE_LOCATION } from "../../utils/mutations";

export default function SaveButton({location}) {
  //useStates
  const [active, setActive] = useState(false);
  //useMutations
  const [saveLocation] = useMutation(SAVE_LOCATION);
  const [unSaveLocation] = useMutation(UNSAVE_LOCATION);
  //useQueries
  const { data, loading, error, refetch } = useQuery(QUERY_SELF_PROFILE, {
    onCompleted: (data) => {
      setActive(true);
      let isSaved = false;
      for (let i = 0; i < data.me.savedLocations.length; i++) {
        if (data.me.savedLocations[i]._id == location._id) {
          isSaved = true;
        }
      }
      isSaved ? setActive(true) : setActive(false);
    },
    fetchPolicy: 'network-only'
  });

  //click functions
  //save location
  const handleSave = async () => {
    const saveTheLocation = await saveLocation({
      variables: {
        locationId: location._id,
      },
    });
    console.log(saveTheLocation);
    setActive(!active);
  };
  //unsave location
  const handleUnSave = async () => {
    try {
      const unSaveTheLocation = await unSaveLocation({
        variables: {
          locationId: location._id,
        },
      });
      console.log("unSaved Location");
      setActive(!active);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {active ? (
        <IconButton aria-label="settings" onClick={handleUnSave}>
          <BookmarkIcon sx={{ color: "purple" }} />
        </IconButton>
      ) : (
        <IconButton aria-label="settings" onClick={handleSave}>
          <BookmarkBorderIcon />
        </IconButton>
      )}
    </>
  );
}