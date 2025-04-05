import { Conversation } from "../Models/conversation.model.js"
import { User } from "../Models/user.model.js"


// search
export const getUserBySearch = async(req,res) => {
    try {
        const search = req.query.search || ''
        const currentUserid = req.user._conditions._id
        const user = await User.find({
            $and:[
                {$or:[
                    {username:{$regex:'.*'+search+'.*',$options:'i'}},
                    {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                ]},{
                    _id:{$ne:currentUserid}
                }
            ]
        }).select("-password").select("email")
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(message);
    }
}


// current chats
export const getCurrentChatters = async(req,res) => {
    try {
        const currentUserid = req.user._conditions._id
        const currentchatters = await Conversation.find({
            participants:currentUserid
        }).sort({
            updatedAt:-1
        })
        if(!currentchatters || currentchatters.length === 0){
            return res.status(200).send([])
        }
        const participantsids = currentchatters.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter((id) => id.toString() !== currentUserid.toString());
            return [...ids, ...otherParticipants];
        }, []); // Ensure the initial value is an empty array
        const otherParticipantsids = participantsids.filter((id)=> id.toString() !== currentUserid.toString()); // Ensure unique values
        const user = await User.find({ _id: { $in: otherParticipantsids } }).select("-password -email");
        const users = otherParticipantsids.map((id)=> user.find(user => user._id.toString() === id.toString()))
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
        //console.log(message);
    }
}