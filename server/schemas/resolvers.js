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
  },
};

module.exports = resolvers;
