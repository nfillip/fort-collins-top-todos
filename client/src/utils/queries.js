import { gql } from "@apollo/client";

export const ALL_USERS = gql`
query Users {
  users {
    email
    _id
    friendRequests {
      _id
    }
    friends {
      _id
    }
    friendsYouRequested {
      _id
    }
    matches {
      _id
    }
    profilePic
    profilePicURL
    username
  }
}`

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
      user {
        username
        profilePicURL
      }
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
export const BARS_LOCATIONS = gql`
query BarsLocations {
  barsLocations {
    name
    _id
    address
    blog {
      _id
      createdAt
      messageText
      user {
        username
        profilePicURL
      }
    }
    categories
    creator {
      _id
      username
    }
    description
    images
    imagesURL
    barsLikes {
      _id
    }
  }
}`
export const VIEWS_LOCATIONS = gql`
query viewsLocations {
  viewsLocations {
    name
    _id
    address
    blog {
      _id
      createdAt
      messageText
      user {
        username
        profilePicURL
      }
    }
    categories
    creator {
      _id
      username
    }
    description
    images
    imagesURL
    viewsLikes {
      _id
    }
  }
}`
export const RESTAURANT_LOCATIONS = gql`
query RestaurantLocations {
  restaurantLocations {
    name
    _id
    address
    blog {
      _id
      createdAt
      messageText
      user {
        username
        profilePicURL
      }
    }
    categories
    creator {
      _id
      username
    }
    description
    images
    imagesURL
    restaurantsLikes {
      _id
    }
  }
}`

export const QUERY_MATCH_MESSAGES = gql`
  query OneMatch($matchId: ID!) {
    oneMatch(matchId: $matchId) {
      user1 {
        _id
        username
        profilePicURL
      }
      user2 {
        _id
        username
        profilePicURL
      }
      messages {
        user {
          _id
          username
          profilePicURL
        }
        messageText
        createdAt
      }
    }
  }
`;

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
      profilePicURL
    }
    friends {
      _id
      username
      profilePicURL
    }
    friendsYouRequested {
      _id
      username
      profilePicURL
    }
    savedLocations {
      _id
      address
      categories
      creator {
        _id
      }
      description
      images
      imagesURL
      name
      blog {
        _id
        createdAt
        messageText
        user {
          username
          profilePicURL
        }
      }
    }
    matches {
      _id
      messages {
        _id
        createdAt
        messageText
        user {
          username
          profilePicURL
        }
      }
      user1 {
        _id
        profilePicURL
        username
      }
      user2 {
        _id
        profilePicURL
        username
      }
    }
  }
}
`;
