import { User } from "../Models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwtToken from '../utils/jwtWebToken.js'


// register
export const userRegister = async(req,res) => {
    try {
        // data
        const { fullname, username, email, gender, password, profilepic } = req.body
        // check user existence
        const user = await User.findOne({username,email})
        if(user) {
            return res.status(500).send({success:false,message:"userName or email Already exist!"})
        }
        // hash password
        const hashPassword = bcryptjs.hashSync(password , 10)
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser = new User({
            fullname,
            username,
            email,
            password:hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        })
        if(newUser){
            await newUser.save()
            jwtToken(newUser._id,res)
        }else{
            return res.status(500).send({success:false,message:"invalid user Data!"})
        }
        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error)
    }
}


// login
export const userLogin = async(req,res) => {
    try {
        // data
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(501).send({ success:false , message:"Email doesn't exist, Register first!" })
        }
        const match = bcryptjs.compareSync(password , user.password || "")
        if(!match) {
            return res.status(501).send({ success:false , message:"Password doesn't match!" })
        }
        jwtToken(user._id,res)

        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email: user.email,
            message:"successfully login",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error)
    }
}

// logout
export const userLogout = async(req,res) => {
    try {
        res.cookie("jwt" , '',{
            maxAge:0
        })
        res.status(200).send({success:true,message:"User LogOut"})
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error)
    }
}