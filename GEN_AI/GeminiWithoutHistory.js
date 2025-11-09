import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [],
});

async function main() {
  const userQuery = readlineSync.question("Ask Question -> ");
  const response = await chat.sendMessage({
    message: userQuery,
  });
  const response1 = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works",
  });

  for await (const chunk of response1) {
    console.log(chunk.text);
  }


  console.log("Chat response :-> ", response.text);
  main();
}

await main();
