
import express from 'express'
const ChatApp=express.Router();
// import {verifyToken} from '../middleware/auth.js'
import {accessChat,getAllChats} from '../controllers/chatController.js';
import { verifyToken } from '../middleware/auth.js';


// api/chat  POST to Create or access 1-1 chat
 ChatApp.post('/',verifyToken,accessChat); // add verify token
// GET /api/chat
ChatApp.get('/',verifyToken,getAllChats); // add verify token

export default ChatApp;


