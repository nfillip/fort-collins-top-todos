//react imports
import React from "react";
import { useQuery } from "@apollo/client";
//local imports
import { VIEWS_LOCATIONS } from "../utils/queries";
import CardMap from "../components/SunsetComps/CardMap"
import LoadingComp from "../components/LoadingComp/LoadingComp"
import Error from "./Error"

export default function Bars() {
  const cat = "hike";
  //query locations with "hike" category
  const { data, loading, error, refetch } = useQuery(VIEWS_LOCATIONS,{
    fetchPolicy: 'network-only',
  });

  if (loading) return <LoadingComp />;
  if (error) {
    console.error(error);
    return <Error />;
  }
  return (
    <>
      <CardMap data = {data.viewsLocations} cat = {cat} refetchPageLocs={refetch} />
    </>
  );
}
