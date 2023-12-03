//react imports
import React from "react";
import { useQuery } from "@apollo/client";
//local imports
import {SUNSET_LOCATIONS } from "../utils/queries";
import CardMap from "../components/SunsetComps/CardMap"
import LoadingComp from "../components/LoadingComp/LoadingComp"
import Error from "./Error"
export default function Sunset() {
  const cat = "sunset";
  //query locations with sunset category
  const { data, loading, error, refetch } = useQuery(SUNSET_LOCATIONS,{
    fetchPolicy: 'network-only',
  });

  if (loading) return <LoadingComp />;
  if (error) {
    console.log(error);
    return <Error />;
  }
  return (
      <>
      <CardMap data = {data.sunsetLocations} cat = {cat} refetchPageLocs = {refetch}/>
      </>
  );
}
