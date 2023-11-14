const { User, Match, Message, Location } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      const singleUser = await User.findOne({ _id: userId })
        .populate("friendsYouRequested")
        .populate("friendRequests")
        .populate("friends");
      return singleUser;
    },
    users: async () => {
      return await User.find();
    },
    me: async (parent, args, { user }) => {
      if (user) {
        return await User.findById({ _id: user._id })
          .populate("friendsYouRequested")
          .populate("friendRequests")
          .populate("friends")
          .populate({
            path: "matches",
            populate: [{ path: "user1" }, { path: "user2" }],
          });
      }
      throw new AuthenticationError();
    },
    allLocations: async () => {
      return await Location.find();
    },
    singleLocation: async () => {
      const singleLocation = await Location.findOne({_id: locationId})
    }
  },

  Mutation: {
    // CREATE route: create user account
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({
        username: username,
        email: email,
        password: password,
        image: "empty-profile_ttux5f",
      });
      const token = signToken(user);
      return { token, user };
    },
    // LOGIN: login User
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    sendFriendRequest: async (parent, {otherId}, {user}) => {
      const addToYourRequests = await User.findOneAndUpdate(
        {_id: user._id},
        {$push: {friendsYouRequested: otherId}},
        {new: true}
      )
      const sendRequest = await User.findOneAndUpdate(
        {_id: otherId},
        {$push: {friendRequests: user._id}},
        {new: true}
      )
      console.log("Friend Request Sent!")
      return sendRequest;
      },
    acceptFriendRequest: async (parent, {otherId},{user}) => {
      const newMatch = await Match.create({
        user1: user._id.toString(),
        user2: otherId.toString(),
      });
      // Update Own User Model  - add match, add friend, delete requests
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { matches: newMatch._id } },
      );
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: {friends: otherId}},
      );
      await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: {friendsYouRequested: otherId}},
      );
      await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: {friendRequests: otherId}}
      );
      // Update Other User Model  - add match, add friend, delete requests
      await User.findOneAndUpdate(
        { _id: otherId },
        { $push: { matches: newMatch._id } },
      );
      await User.findOneAndUpdate(
        { _id: otherId },
        { $push: {friends: user._id}},
      );
      await User.findOneAndUpdate(
        { _id: otherId },
        { $pull: {friendsYouRequested: user._id}},
      );
      await User.findOneAndUpdate(
        { _id: otherId },
        { $pull: {friendRequests: user._id}}
      );
      return newMatch;
    },
    createLocation: async (parent, {locationName, address}, {user}) => {
      const newLocation = await Location.create({
        name: locationName, 
        address: address,
        creator: user._id
       }
      )
      console.log("new location created!")
      return newLocation;
    }
  }
};

module.exports = resolvers;
