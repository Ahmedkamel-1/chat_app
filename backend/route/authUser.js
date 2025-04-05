import { Router } from 'express'
import { userLogin, userLogout, userRegister } from '../controllers/auth.controller.js'

const router = Router()

// register
router.post("/register" , userRegister)


// login
router.post("/login" , userLogin)


//logout
router.get("/logout" , userLogout)

export default router