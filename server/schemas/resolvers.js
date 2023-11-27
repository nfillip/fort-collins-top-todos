const { User, Match, Message, Location } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      const singleUser = await User.findOne({ _id: userId })
        .populate("friendsYouRequested")
        .populate("friendRequests")
        .populate("friends")
        .populate("savedLocations");
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
          .populate("savedLocations")
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
    sunsetLocations: async () => {
      const sunsetLocations = await Location.find({
        categories: "sunset"
      })
      sunsetLocations.sort((a,b) => b.sunsetLikes.length - a.sunsetLikes.length)
      return sunsetLocations;
    },
    barsLocations: async () => {
      const barsLocations = await Location.find({
        categories: "bar"
      })
      barsLocations.sort((a,b) => b.barsLikes.length - a.barsLikes.length)
      return barsLocations;
    },
    viewsLocations: async () => {
      const viewsLocations = await Location.find({
        categories: "view"
      })
      viewsLocations.sort((a,b) => b.viewsLikes.length - a.viewsLikes.length)
      return viewsLocations;
    },
    restaurantLocations: async () => {
      const restaurantLocations = await Location.find({
        categories: "restaurant"
      })
      restaurantLocations.sort((a,b) => b.restaurantsLikes.length - a.restaurantsLikes.length)
      return restaurantLocations;
    },
    singleLocation: async (parent, {locationId}) => {
      const singleLocation = await Location.findOne({_id: locationId})
      .populate("blog")
      return singleLocation;
    }
  },

  Mutation: {
    // CREATE route: create user account
    createUser: async (parent, { username, email, password, profilePic, profilePicURL }) => {
      const user = await User.create({
        username: username,
        email: email,
        password: password,
        profilePic: profilePic,
        profilePicURL: profilePicURL
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
    createLocation: async (parent, {locationName, address, description, imagesURL, images, categories}, {user}) => {
      const newLocation = await Location.create({
        name: locationName, 
        address: address,
        creator: user._id,
        description: description,
        categories: categories, 
        images: images,
        imagesURL: imagesURL
       }
      )
      console.log("new location created!")
      return newLocation;
    },
    upVoteLocation: async (parent, {locationId, cat}, {user}) => {
      switch(cat) {
        case "sunset":
          const addSunsetLike = await Location.findOneAndUpdate(
            {_id: locationId},
            {$push: {sunsetLikes: user._id}}
          )
          break;
        case "bar":
          const addBarsLike = await Location.findOneAndUpdate(
            {_id: locationId},
            {$push: {barsLikes: user._id}}
          )
          break;
        case "view":
          const addViewsLike = await Location.findOneAndUpdate(
              {_id: locationId},
              {$push: {viewsLikes: user._id}}
            )
          break;
        case "restaurant":
            const addRestLikes = await Location.findOneAndUpdate(
                {_id: locationId},
                {$push: {restaurantLikes: user._id}}
              )
            break;
      }
    },
    removeVoteLocation: async (parent, {locationId, cat}, {user}) => {
      switch(cat) {
        case "sunset":
          const addSunsetLike = await Location.findOneAndUpdate(
            {_id: locationId},
            {$pull: {sunsetLikes: user._id}}
          )
          break;
        case "bar":
          const addBarsLike = await Location.findOneAndUpdate(
            {_id: locationId},
            {$pull: {barsLikes: user._id}}
          )
          break;
        case "view":
          const addViewsLike = await Location.findOneAndUpdate(
              {_id: locationId},
              {$pull: {viewsLikes: user._id}}
            )
          break;
        case "restaurant":
            const addRestLikes = await Location.findOneAndUpdate(
                {_id: locationId},
                {$pull: {restaurantLikes: user._id}}
              )
            break;
      }
    },
    saveLocation: async (parent, {locationId}, {user}) => {
      const addLocationToUser = await User.findOneAndUpdate(
        {_id: user._id},
        {$push: {savedLocations: locationId}},
        {new: true}
      )
      return addLocationToUser
    },
    unSaveLocation: async (parent, {locationId}, {user}) => {
      const unSaveLocationToUser = await User.findOneAndUpdate(
        {_id: user._id},
        {$pull: {savedLocations: locationId}},
        {new: true}
      )
      return unSaveLocationToUser
    },
    addBlogPost: async (parent, {locationId, messageText}, {user}) => {
      const newMessage = await Message.create(
        {user: user._id,
          messageText: messageText
        }
      )
      const addBlog = await Location.findOneAndUpdate(
        {_id: locationId},
        {$push: {blog: newMessage }},
        {new: true}
      )
      return addBlog
    }
  }
}


module.exports = resolvers;
