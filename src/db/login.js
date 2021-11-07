const mongoose = require('mongoose');
const Schema = mongoose.Schema

const lfmLoginSchema = new Schema({
    _id:{
        type: "string",
        required: true,
    },
    sk: {
        type: "string",
        required: true,
    },
    fmusername: {
        type: "string",
        required: true,
    },
    track: {
        type: "string",
    },
    colour : {
        type: "string"
    }
},{timestamps: true })

const lfmlogin = mongoose.model('lfm', lfmLoginSchema)
module.exports  = lfmlogin