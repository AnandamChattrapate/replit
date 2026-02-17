import express from 'express'
import {sendMessage,getAllMesages} from '../controllers/messageController.js'
const messageRouter=express.Router();
import { verifyToken } from '../middleware/auth.js';


// POST Send message
messageRouter.post('/',verifyToken,sendMessage);

//GET api/:chatId get all messages of a chat
messageRouter.get("/:otherUserId",verifyToken,getAllMesages);
export default messageRouter;