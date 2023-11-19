const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  images: [{ type: String }],
  imagesURL: [{ type: String }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  sunsetLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  restaurantsLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  viewsLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  barsLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  categories: [{ type: String, required: true }],
  blog: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const Location = model("Location", locationSchema);
module.exports = Location;
