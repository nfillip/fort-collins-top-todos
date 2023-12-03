import React from "react";
import { useQuery} from "@apollo/client";
import { QUERY_SELF_PROFILE } from "../utils/queries";
import CardMap from "../components/SunsetComps/CardMap"
import LoadingComp from "../components/LoadingComp/LoadingComp"
import Error from "./Error"
export default function Saved() {
  const cat = "saved";
  //query self profile for saved locations
  const { data, loading, error} = useQuery(QUERY_SELF_PROFILE,{
    fetchPolicy: 'network-only',
  });

  if (loading) return <LoadingComp />;
  if (error) {
    console.error(error)
    return <Error />;
  }
  return (
    <>
      <CardMap data = {data.me.savedLocations} cat = {cat} />
    </>
  );
}
