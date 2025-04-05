import { Conversation } from "../Models/conversation.model.js"
import { Message } from "../Models/message.model.js"
import { getRecieverSocketid,io } from "../Socket/socket.js"
// create
export const sendMessage = async (req,res) => {
    try {
        const { messages } = req.body
        const { id:recieverid } = req.params
        const senderid = req.user._conditions._id

        let chats = await Conversation.findOne({
            participants:{$all:[senderid , recieverid]}
        })

        if(!chats) {
            chats = await Conversation.create({
                participants:[senderid , recieverid]
            })
        }
        const newMessages = new Message({
            senderid,
            recieverid,
            message:messages,
            conversationid:chats._id
        })

        if(newMessages) {
            chats.messages.push(newMessages._id)
        }

        await Promise.all([chats.save(),newMessages.save()])
        // Socket.io function
        const recieverSocketid = getRecieverSocketid(recieverid)
        if(recieverSocketid){
            io.to(recieverSocketid).emit("newMessage" , newMessages)
        }
        res.status(201).send(newMessages)
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error);
    }
}


// read
export const getMessages = async (req, res) => {
    try {
        const { id: recieverid } = req.params;
        const senderid = req.user._id;

        const chats = await Conversation.findOne({
            participants: { $all: [senderid, recieverid] }
        }).populate("messages");

        if (!chats) return res.status(200).send([]);

        res.status(200).send(chats.messages);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error.message);
    }
};