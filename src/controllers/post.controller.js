const { response } = require("../app");
const postmodel = require("../models/post.model");
const { generateCaption } = require("../service/ai.service");

async function createPostController(req, res){
    const file = req.file;
    console.log("File received:", file);

    //converting the image into base64 format
    const base64Image = file.buffer.toString('base64');
    const caption = await generateCaption(base64Image);
    res.status(200).json({
        caption
    })


}


module.exports = createPostController;