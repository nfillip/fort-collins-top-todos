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
    users: async (parent, args, {user}) => {
      const allUsers =  await User.find({_id: {$ne: user._id}});
      allUsers.sort((a,b) => a.username.localeCompare(b.username))
      return allUsers;
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
            populate: [{ path: "user1" }, { path: "user2" }, {path: "messages", populate: {path: "user"}}],
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
      .populate({
        path: "blog",
        populate: {path: "user"}
      })
      sunsetLocations.sort((a,b) => b.sunsetLikes.length - a.sunsetLikes.length)
      return sunsetLocations;
    },
    barsLocations: async () => {
      const barsLocations = await Location.find({
        categories: "bar"
      })
      .populate({
        path: "blog",
        populate: {path: "user"}
      })
      barsLocations.sort((a,b) => b.barsLikes.length - a.barsLikes.length)
      return barsLocations;
    },
    viewsLocations: async () => {
      const viewsLocations = await Location.find({
        categories: "view"
      })
      .populate({
        path: "blog",
        populate: {path: "user"}
      })
      viewsLocations.sort((a,b) => b.viewsLikes.length - a.viewsLikes.length)
      return viewsLocations;
    },
    restaurantLocations: async () => {
      const restaurantLocations = await Location.find({
        categories: "restaurant"
      })
      .populate({
        path: "blog",
        populate: {path: "user"}
      })
      restaurantLocations.sort((a,b) => b.restaurantsLikes.length - a.restaurantsLikes.length)
      return restaurantLocations;
    },
    singleLocation: async (parent, {locationId}) => {
      const singleLocation = await Location.findOne({_id: locationId})
      .populate("blog")
      return singleLocation;
    },
    oneMatch: async (parent, { matchId }) => {
      return Match.findOne({ _id: matchId })
        .populate("user1")
        .populate("user2")
        .populate({
          path:"messages",
          populate: {path: "user"}
        });
    },
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
      removeFriendRequest: async (parent, {otherId}, {user}) => {
        const removeFromYourRequests = await User.findOneAndUpdate(
          {_id: user._id},
          {$pull: {friendsYouRequested: otherId}},
          {new: true}
        )
        const removeRequest = await User.findOneAndUpdate(
          {_id: otherId},
          {$pull: {friendRequests: user._id}},
          {new: true}
        )
        console.log("Friend Request Removed!")
        return removeRequest;
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
    removeFriend: async (parent, {otherId}, {user}) => {
      let matchId = ""
      const allMatches = await Match.find()
      allMatches.forEach((match,index) => {
        if((match.user1._id.toString() === user._id && match.user2._id.toString() === otherId) || (match.user2._id.toString() === user._id && match.user1._id.toString() === otherId)){
          matchId = match._id.toString()
        }
      })
      const removeMatch = await Match.findOneAndRemove({
        _id: matchId
      })
      const removeFriendFromYourAccount = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: {friends: otherId}},
      );
      const removeYouFromTheirAccount = await User.findOneAndUpdate(
        { _id: otherId },
        { $pull: {friends: user._id}},
      );
      console.log("removed friend")
      return matchId;
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
    },
    updateUser: async (parent, args, {user}) => {
      if (user) {
        const updateInfo = { ...args };
        if (updateInfo.password) {
          const saltRounds = 10;
          updateInfo.password = await bcrypt.hash(
            updateInfo.password,
            saltRounds
          );
        }
        updateInfo.image = args.image;
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id},
          { ...updateInfo },
          { new: true }
        );
        if (updatedUser) {
          return {
            message: "Account updated successfully.",
            user: updatedUser,
          };
        } else {
          throw new UserInputError("Update failed.");
        }
      }
      throw AuthenticationError;
    },
    createMessage: async (parent, { matchId, messageText }, { user }) => {
      const newMessage = await Message.create({ user: user._id, messageText });
      const updateMatch = await Match.findOneAndUpdate(
        { _id: matchId },
        { $push: { messages: newMessage } }
      );
      console.log("Created new message and stored to Match");
      return updateMatch;
    },
  }
}


module.exports = resolvers;
