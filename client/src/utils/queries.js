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

export const SUNSET_LOCATIONS = gql`
query SunsetLocations {
  sunsetLocations {
    name
    _id
    address
    blog {
      _id
      createdAt
      messageText
    }
    categories
    creator {
      _id
      username
    }
    description
    images
    imagesURL
    sunsetLikes {
      _id
    }
  }
}`
export const QUERY_SELF_PROFILE = gql`
query Query {
  me {
    _id
    profilePic
    profilePicURL
    username
    email
    friendRequests {
      _id
      username
    }
    friends {
      _id
      username
    }
    friendsYouRequested {
      _id
      username
    }
    savedLocations {
      _id
      name
    }
    matches {
      _id
      messages {
        _id
        createdAt
        messageText
      }
      user1 {
        _id
      }
      user2 {
        _id
      }
    }
  }
}
`;
