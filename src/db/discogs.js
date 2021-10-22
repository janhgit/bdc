const mongoose = require('mongoose');
const Schema = mongoose.Schema

const discogsSchema = new Schema({
    _id:{
        type: "string",
        required: true,
    },
    discname: {
        type: "string",
        required: true,
    }

})

const discogs = mongoose.model('discogs', discogsSchema);
module.exports = discogs;