import mongoose, { model, Schema, Types } from "mongoose";


// Schema
const messageSchema = new Schema({
    senderid: {
        type: Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverid: {
        type: Types.ObjectId,
        ref:"User",
        required:true
    },
    message: {
        type:String,
        required:true
    },
    conversationid: {
        type: Types.ObjectId,
        ref:"Conversation",
        required:true
    }
},{timestamps:true})


// Model
export const Message = mongoose.model.Message || model("Message" , messageSchema)