import express from 'express'
import { searchUser} from '../controllers/userController.js';
// import {verifyToken} from '../middleware/auth.js'

const userRouter=express.Router();

// api/users Search users
userRouter.get('/search',searchUser); // add verify token

export default userRouter;