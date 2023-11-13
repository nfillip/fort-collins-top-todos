const { Schema, model } = require("mongoose");


const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    address: {
        type: String,
    },
    images:
        [{type: String}],
    sunsetLikes: 
        [{ type: Schema.Types.ObjectId, ref: "User" }],
    sunriseLikes: 
        [{ type: Schema.Types.ObjectId, ref: "User" }],
    viewsLikes: 
        [{ type: Schema.Types.ObjectId, ref: "User" }],
    barsLikes: 
        [{ type: Schema.Types.ObjectId, ref: "User" }],
    categories: 
        [{type: String}],
    blog: [{type: Schema.Types.ObjectId, ref: 'Message' }]

})

const Location = model('Location', locationSchema)
module.exports = Location;