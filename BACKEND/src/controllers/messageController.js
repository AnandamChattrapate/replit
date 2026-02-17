import express from 'express'
const router=express.Router();
import Message from '../models/message.js'
import Chat from '../models/chat.js'
import jwt from 'jsonwebtoken'

// send message
export const sendMessage=async (req,res)=>{
try{
    let decoded;
    const token=req.cookies.token
    if (!token) {
    return res.status(401).json({ message: "Not authorized" });
    }
    try {
     decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    } catch (err) {
    return res.status(401).json({ message: "Invalid token" +err.message});
    }

    console.log("decoded userId :",decoded.userId)
    //const currentUser=req.body.cId;
    const currentUser=decoded.userId;
    const otherUser=req.body.oId;
    const message=req.body.text;
    const existingChat= await Chat.findOne({users:{$all:[currentUser,otherUser]}})
    console.log("existing chat :",existingChat)
    const ChatId=existingChat._id;
    const newMessage=await Message.create({
        chatId:ChatId,
        senderId:currentUser,
        text:message
    })
    console.log("new message : ",newMessage)
    if (!newMessage){
        return res.status(400).json({message:"unable to send message "})
    }
    return res.status(200).json({message:"message sent successfully  ",payload:newMessage})

    // if (existingChat){
    //     // fetch message of that chat id
    //     //const messages=await Message.find({chatId:existingChat._id})
    // }else{
    //     // create a new chat ie add in chats
    //     // then in messages send the current message to reciever
    // }
}catch(err){
return res.status(400).json({message:err.message })
}
}
// read messages
export const getAllMesages=async(req,res)=>{
    try{
        console.log("current user Id : ",req.userId)
        console.log("other user id : ",req.params.otherUserId)
        const cId=req.userId;
        // const oId=req.body.oId;
        // // we are sending chat i dfrom front end 
        // const chat=await Chat.findOne(
        //     {users: {$all:[cId,oId]}}
        // )
        // we are getting user id here 
        //console.log("test chat / user id ",req.params.otherUserId)
        //console.log("2 users ids ",userId,otherUserId)
        const otherUserId=req.params.otherUserId;
        const chat=await Chat.findOne({
            users: {$all:[req.userId,otherUserId]}
        })
        if (!chat){
            const newChat=await Chat.create({
                        users: [req.userId,otherUserId]
                        })

            return res.status(401).json({message :"no chats found , send ur first message "})
        }
        console.log("chat object of 2 users : ",chat)
        
        const messages=await Message.find({
            chatId:chat._id
        }).sort({createdAt:1}).select("senderId text createdAt _id");;
        // sort messages based on time 
        if (!messages){
            return res.status(400).json({message:"no messages exists , send first message :) "})
        }
    else if (messages.length==0){
        return res.status(200).json({message:"no messages exists , send first message :) "})
    }

        return  res.status(200).json({message:"chats of 2 users ",payload:messages})




    }catch(err){
        return res.status(400).json({message:err.message })

    }
}