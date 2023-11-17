import { gql } from "@apollo/client";
export const ALL_LOCATIONS = gql`
query AllLocations {
    allLocations {
      address
      name
      _id
    }
  }`

export const QUERY_SELF_PROFILE = gql`
query self {
    me {
      profilePic
      username
      profilePicURL
    }
  }
`;