//react imports
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
//local imports
import { BARS_LOCATIONS } from "../utils/queries";
//MUI imports
import CardMap from "../components/SunsetComps/CardMap"

export default function Bars() {
  const cat = "bar";

  const { data, loading, error, refetch } = useQuery(BARS_LOCATIONS,{
    fetchPolicy: 'network-only'
  });

  if (loading) return <span>...loading</span>;
  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }
  return (
    <>
      <div>Best Bars in Fort Collins</div>
      <CardMap data = {data.barsLocations} cat = {cat} />
    </>
  );
}