import mongoose, { model, Schema, Types } from "mongoose";



// Schema
const conversationSchema = new Schema({
    participants:[
        {
            type: Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})


// model
export const Conversation = mongoose.model.Conversation || model("Conversation" , conversationSchema)