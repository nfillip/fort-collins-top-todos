//react imports
import React from "react";
//MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
//local imports
import SingleCard from "./SingleCard";
import AddLocationModal from "./AddLocModal";

// auto swap through photos
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function CardMap({ data, cat, refetchPageLocs }) {
  let titleLine = ``;
  if (cat == "saved") {
    titleLine = `SAVED LOCATIONS`;
  } else {
    titleLine = `BEST ${cat}S`.toUpperCase();
  }

  return (
    <>
      <div className="pageBackground">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "start", sm: "start", md: "center" },
          }}
        >
          <Box>
            <Typography
              className="pageTitle"
              sx={{
                ml: 5,
                mb: 0,
                color: "white",
                fontSize: { xs: "2rem", sm: "3rem", lg: "3rem" },
              }}
            >
              {titleLine}
            </Typography>
            <Typography
              className="pageTitle"
              sx={{
                ml: 5,
                mb: 0,
                color: "white",
                fontSize: { xs: "1.5rem", sm: "2.5rem", lg: "2.5rem" },
              }}
            >
              Fort Collins
            </Typography>
          </Box>
          <AddLocationModal />
        </Box>
        <Grid container spacing={2} sx={{ paddingTop: 0 }}>
          {data.map((location, index) => (
            <Grid
              className="noPaddingGrid"
              item
              key={index}
              xs={12}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center", p: 2 }}
            >
              <SingleCard
                location={location}
                index={index}
                cat={cat}
                refetchPageLocs={refetchPageLocs}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
