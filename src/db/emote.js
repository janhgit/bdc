const mongoose = require('mongoose');
const Schema = mongoose.Schema

const lfmEmojiSchema = new Schema({
    _id:{
        type: "string",
        required: true,
    },
    emoteTwo: {
        type: "string",
        required: true,
    },
    emoteOne: {
        type: "string",
        required: true,
    },
})

const lfmemoji = mongoose.model('lfmemojis', lfmEmojiSchema);
module.exports = lfmemoji;