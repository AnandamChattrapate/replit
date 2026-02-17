
// import { verifyToken } from '../middleware/auth.js';
import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/authController.js';
const authRouter = express.Router();
authRouter.post('/signup', createUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
