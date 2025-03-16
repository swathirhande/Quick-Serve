import { Router } from "express";
import ChatBot from "../controllers/ChatBot";
const router = Router();


router.post("/",ChatBot.getChatBotReply);

export default router;