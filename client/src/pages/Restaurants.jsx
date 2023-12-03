//react imports
import React from "react";
import { useQuery } from "@apollo/client";
//local imports
import { RESTAURANT_LOCATIONS } from "../utils/queries";
import CardMap from "../components/SunsetComps/CardMap"
import LoadingComp from "../components/LoadingComp/LoadingComp"
import Error from "./Error"

export default function Restaurants() {
  const cat = "restaurant";
  //query all locations with "restaurant category"
  const { data, loading, error, refetch } = useQuery(RESTAURANT_LOCATIONS,{
    fetchPolicy: 'network-only'
  });

  if (loading) return <LoadingComp />;
  if (error) {
    console.log(error);
    return <Error />;
  }
  return (
    <>
      <CardMap data = {data.restaurantLocations} cat = {cat} refetchPageLocs={refetch} />
    </>
  );
}
