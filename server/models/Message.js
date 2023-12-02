const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (date => {return date.toLocaleDateString('en-GB')})
    },
    messageText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})

const Message = model('Message', messageSchema)
module.exports = Message;
