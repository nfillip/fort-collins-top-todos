const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String 
    profilePic: String
    profilePicURL: String
    savedLocations: [Location]
    friendsYouRequested: [User]
    friendRequests: [User]
    friends: [User]
    matches: [Match]
}

type Match {
_id: ID
user1: User
user2: User
messages: [Message]
}

type Message {
  _id: ID
  user: User
  createdAt: String
  messageText: String
}

type Location {
  _id: ID
  name: String
  address: String
  description: String
  images: [String]
  imagesURL: [String]
  creator: User
  sunsetLikes: [User]
  restaurantsLikes: [User]
  viewsLikes: [User]
  barsLikes: [User]
  categories: [String]
  blog: [Message]
}

type Auth {
    token: ID! 
    user: User
}

type Query {
  users: [User]
  user(userId: ID!): User
  oneMatch(matchId: ID!): Match
  getYourFriends: [User]
  getRequestsYouSent: [User]
  getRequestsYouReceive: [User]
  me: User
  allLocations: [Location]
  singleLocation(locationId: ID!): Location
  sunsetLocations: [Location]
  barsLocations: [Location]
  viewsLocations: [Location]
  restaurantLocations: [Location]
}

type Mutation {
  createUser(username: String!, email: String!, password: String!, profilePic: String, profilePicURL: String): Auth
  login(email: String!, password: String!): Auth
  sendFriendRequest(otherId: ID!): User
  acceptFriendRequest(otherId: ID!): Match
  createLocation(locationName: String!, address: String!, description: String!, imagesURL:[String]!, images: [String]!, categories: [String]!): Location
  upVoteLocation(locationId: ID!, cat: String!):Location
  removeVoteLocation(locationId: ID!, cat: String!):Location
  saveLocation(locationId: ID!):User
  unSaveLocation(locationId: ID!):User
  addBlogPost(locationId: ID!, messageText: String!): Location
  updateUser(username: String, email: String, password: String, profilePic: String, profilePicURL: String):User
}
`;

module.exports = typeDefs;
