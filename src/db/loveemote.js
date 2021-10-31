const mongoose = require('mongoose');
const Schema = mongoose.Schema

const emojiSchema = new Schema({
    _id: {
        type: 'string',
        required: true
    },
    emote:{
        type: "string",
        required: true
    }

})

const schema = mongoose.model('loveemoji', emojiSchema)
module.exports = schema