import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_LOCATIONS } from "../utils/queries";
export default function Sunset() {
    const {data,loading,error} = useQuery(ALL_LOCATIONS)

    if (loading) return <span>...loading</span>
    if (error) {
        console.log(error)
        return `Error! ${error.message}`;
    }
    return (
        <div>This is the Sunset Page</div>
    )
}