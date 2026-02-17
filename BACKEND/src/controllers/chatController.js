import express from 'express'
import Chat from '../models/chat.js';
const router=express.Router();
import User from '../models/user.js'
// accessChat getAllchats
export const getAllChats=async(req,res)=>{
    try{
        //console.log("In get all chats : ",req)
        let currentUserId=req.userId;
        // get the all chats with crntuserid
        const chats= await Chat.find({
            // can also use 
            // users: { $in: [currentUserId] }
            users:currentUserId
        }).populate("users","name")
        let chatDetails=[];

        for(let v of chats){
            chatDetails.push(v.users)
        }
        let necessaryDetails=[]
        for(let v of chatDetails){
            //console.log("each v : ",v)
            for (let x of v){
                if(x._id!=currentUserId){
                    console.log("x : ",x);
                    necessaryDetails.push(x)
                }
                
                
            }
        }
        //console.log("all Users details : ",chatDetails)

        //console.log('all chats for user id ',currentUserId);
        //console.log(chats)
        return res.status(200).json({message :"all chats for a user id ",payload:necessaryDetails})


        
        

    }catch(err){
        return res.status(400).json({message:"get all chats"+err.message})
    }
}

export const accessChat=async (req,res)=>{
    try{
        const cId=req.userId;
        const {oId} =req.body;
        const allConvo=await Chat.find({
            users:{$all:[cId,oId]}
        })
        if(allConvo){
            return res.status(200).json({message : "1-1 chat ",payload:allConvo})
        }else{ 

            const newChat=await Chat.create({
            users: [cId,oId]
            })
            console.log("======new chat created==== \n ",cId,oId);
           return  res.status(200).json({message:"new chat created ",payload:newChat})
        }

        

    }catch(err){
        return res.status(400).json({message : err.message})

    }
}

// export const createChat=async (req,res)=>{
// try{
//     console.log('req.user:', req.userId);
// console.log('req.body:', req.body);

//     // if it is req.body._id user can change it , security issue
//     const currentUser=req.userId; // current user
//     const {username}=req.body; //selected user to create chat 
// if (!username){
//           return res.status(400).json({ message: 'Username required' });

// }
//     // const userExists= await User.find({search})
//     // if (!userExists){
//     //     console.log('user not found ')
//     //     res.status(200).json({message:"user not found "})
//     // }
//     // check if exists previously 
// const selectedUser = await User.findOne({ name:username});

//     if (!selectedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//    const  chatExists=await Chat.findOne({
//         users:{ $all:[currentUser,selectedUser._id],$size:2}
//     })
// if (chatExists) {console.log("chat exists previously ")
//     console.log('chats are : ',chatExists)
// res.status(200).json(chatExists) }

// else{ 
//     const newChat=await Chat.create({
//        users: [currentUser,selectedUser._id]
//     })
//     console.log("======new chat created==== \n ",selectedUser,currentUser);
//     res.status(200).json(newChat)

// }}catch(err){
//     console.log("error : ",err);
// }
// }
