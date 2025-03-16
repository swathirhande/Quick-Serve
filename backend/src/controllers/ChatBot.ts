import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

  const getChatBotReply = async (req: Request, res: Response) => {
    const { question } = req.body;
    try {
      const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          generationConfig: { maxOutputTokens: 1000 }
        });
  
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = response.text();
        const plainText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') 
        .replace(/\*(.*?)\*/g, '$1')    
        .replace(/\*\*\*(.*?)\*\*\*/g, '$1') 
        .replace(/^\s*[\*\-]\s+/gm, '• '); 
    
        res.json({ answer: plainText });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  };

  export default {
    getChatBotReply
  }