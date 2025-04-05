import { Router } from "express";
import isLogin from "../middleware/isLogin.js";
import { getCurrentChatters, getUserBySearch } from "../controllers/user.controller.js";

const router = Router()

// search
router.get("/search" , isLogin , getUserBySearch)


// current chatters
router.get('/currentchatters' , isLogin, getCurrentChatters)

export default router