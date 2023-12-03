//react imports
import React from "react";
import { useQuery} from "@apollo/client";
//MUI imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//local imports
import CommunityCard from "../components/CommunityComps/CommunityCard";
import { ALL_USERS } from "../utils/queries";
import LoadingComp from "../components/LoadingComp/LoadingComp";
import Error from "./Error"

export default function Community() {
  //query all Users in FoCo
  const { data, loading, error, refetch } = useQuery(ALL_USERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <LoadingComp />;
  if (error) {
    console.error(error)
    return <Error />;
  }
  return (
    <div className="pageBackground">
      <Typography
        sx={{
          ml: 5,
          mb: 0,
          color: "white",
          fontSize: { xs: "2rem", sm: "3rem", lg: "3rem" },
        }}
      >
        Meet the Foco Fun Community
      </Typography>
      <Grid container spacing={2} sx={{ paddingTop: 0 }}>
        {data.users.map((user, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={4}
            lg={3}
            sx={{ display: "flex", justifyContent: "center", p: 2 }}
          >
            <CommunityCard
              user={user}
              index={index}
              refetchCommunity={refetch}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
