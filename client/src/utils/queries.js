import { gql } from "@apollo/client";
export const ALL_LOCATIONS = gql`
query allLocations {
  allLocations {
    _id
    name
    address
    images
    imagesURL
    creator {
      _id
    }
    sunsetLikes {
      _id
    }
    viewsLikes {
      _id
    }
    restaurantsLikes {
      _id
    }
    categories
    description
    blog {
      _id
      createdAt
      messageText
      user {
        _id
        username
      }
    }
    barsLikes {
      _id
    }
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
