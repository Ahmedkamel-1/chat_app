import jwt from 'jsonwebtoken'
import { User } from '../Models/user.model.js'


const isLogin = (req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(500).send({ success:false , message:"UnAuthorized User!" })
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        if(!decode) return res.status(500).send({ success:false , message:"UnAuthorized User! - invalid token!" })
        console.log(decode);
        const user = User.findById(decode.userid).select("-password")
        if(!user) return res.status(500).send({ success:false , message:"user not Found!"})
        req.user = user
        next()
    } catch (error) {
        console.log(`Error in isLogin middleware! ${error.message}`)
        res.status(500).send({ success:false , message:error})
    }
}

export default isLogin
