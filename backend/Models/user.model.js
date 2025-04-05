import mongoose, { model, Schema } from "mongoose";


// Schema
const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilepic:{
        type:String,
        required:true,
        default:""
    }
} , { timestamps:true })

//model
export const User = mongoose.model.User || model("User" , userSchema)