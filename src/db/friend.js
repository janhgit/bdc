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
},{timestamps: true })