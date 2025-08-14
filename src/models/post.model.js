const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    imageurl:String,
    caption:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


const postmodel = mongoose.model('Post', postSchema);
module.exports = postmodel;
