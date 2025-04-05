import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import isLogin from "../middleware/isLogin.js";


const router = Router()

// create message
router.post("/send/:id" , isLogin ,sendMessage)

// get message
router.get("/:id" , isLogin ,getMessages)

export default router