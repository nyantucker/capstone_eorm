import express from 'express';
import authRoute from './authRoutes.js';
import imgRoute from './imgRoutes.js';
import userRoute from './userRoutes.js';

const rootRoute = express.Router();
rootRoute.use("/auth", authRoute)
rootRoute.use("/user", userRoute)
rootRoute.use("/img", imgRoute)

export default rootRoute
