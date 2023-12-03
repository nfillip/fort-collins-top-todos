import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import collogo from "../../assets/logo.png";

export default function Loading() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "0px",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            borderRadius: 7,
          }}
        >
          <a href="" target="_blank"></a>
          <a href="https://react.dev" target="_blank">
            <img src={collogo} className="logo react" alt="React logo" />
          </a>
          <Typography
            className="spinner"
            color="white"
            sx={{ fontSize: "3rem" }}
          >
            Loading...
          </Typography>
        </Box>
      </Box>
    </>
  );
}

const itemData = [
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/social2_tscvys.jpg",
    title: "Horsetooth Rock",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/duncans_vnllbs.jpg",
    title: "duncans",
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/arthursrock_c4ecyl.jpg",
    title: "arthurs",
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252691/arapahobend_jpsvei.jpg",
    title: "arapahoe",
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/elliots_fagt3v.jpg",
    title: "elliots",
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/social_hxythn.jpg",
    title: "social",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/elliots2_mbogyp.jpg",
    title: "elliots2",
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/social2_tscvys.jpg",
    title: "social2",
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/whiskeystill_lv9ogg.jpg",
    title: "whiskey",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337387/whiskeystill2_madyt6.jpg",
    title: "whiskey2",
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700252692/rio_diqxtp.jpg",
    title: "rio",
  },
  {
    img: "https://res.cloudinary.com/dkxtk2v4z/image/upload/v1700337384/rio2_jjzkfh.jpg",
    title: "rio2",
    cols: 2,
  },
];
