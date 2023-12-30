import express from 'express';
import { login, signUp } from '../controller/authController.js';

const authRoute = express.Router();

// API signup
authRoute.post("/signup", signUp);

// API login
authRoute.post("/login", login);



export default authRoute