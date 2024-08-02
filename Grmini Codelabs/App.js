const fetch = require('node-fetch').default;
const Headers = require('node-fetch').Headers;
global.fetch = fetch;
global.Headers = Headers;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { readFileSync } = require("fs");
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "What's different between these pictures?";

    const imageParts = [
      fileToGenerativePart("./Gem-img.jpg", "image/jpg"),
      fileToGenerativePart("./Gem-img2.jpeg", "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();