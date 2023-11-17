const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String 
    profilePic: String
    profilePicURL: String
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
  images: [String]
  creator: User
  sunsetLikes: [User]
  sunriseLikes: [User]
  viewLikes: [User]
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

}

type Mutation {
  createUser(username: String!, email: String!, password: String!, profilePic: String, profilePicURL: String): Auth
  login(email: String!, password: String!): Auth
  sendFriendRequest(otherId: ID!): User
  acceptFriendRequest(otherId: ID!): Match
  createLocation(locationName: String!, address: String!): Location
}
`;

module.exports = typeDefs;
