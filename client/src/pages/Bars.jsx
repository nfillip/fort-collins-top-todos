//react imports
import React from "react";
import { useQuery} from "@apollo/client";
//local imports
import { BARS_LOCATIONS } from "../utils/queries";
import LoadingComp from "../components/LoadingComp/LoadingComp"
//MUI imports
import CardMap from "../components/SunsetComps/CardMap"
import Error from "./Error"
export default function Bars() {
  const cat = "bar";
  // query all locations with "bar" category
  const { data, loading, error, refetch } = useQuery(BARS_LOCATIONS,{
    fetchPolicy: 'network-only'
  });

  if (loading) return <LoadingComp />;
  if (error) {
    console.error(error);
    return <Error />;
  }
  return (
    <>
      <CardMap data = {data.barsLocations} cat = {cat} refetchPageLocs={refetch}/>
    </>
  );
}
