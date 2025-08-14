
const { GoogleGenAI } = require("@google/genai");


// The client gets the API key from the environment variable `GEMINI_API_KEY`.;
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {

    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image" },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: "You are a helpful assistant that provides single caption for image which will be used in social media posts.Your caption should be short and concise. You use hashtags and emojis in the caption and provide a caption which will make sure that the post will go viral.Note:Please create only one caption not multiple."
        }
    });
    return response.text;
}

module.exports = { generateCaption };
