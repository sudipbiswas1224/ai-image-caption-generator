const { response } = require("../app");
const postmodel = require("../models/post.model");
const { generateCaption } = require("../service/ai.service");
const { uploadFile } = require("../service/storage.service");
const {v4: uuidv4} = require("uuid");

async function createPostController(req, res){
    const file = req.file;
    console.log("File received:", file);

    //converting the image into base64 format
    const base64Image = file.buffer.toString('base64');
    // console.log(base64Image);
    const caption = await generateCaption(base64Image);

    //upload the image in the imagekit
    const result = await uploadFile(base64Image, uuidv4());
    const post = await postmodel.create({
        imageurl:result.url,
        caption:caption,
        userId:req.user._id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })


}


module.exports = createPostController;