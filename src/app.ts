import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'
import cors from 'cors';
import connectDB from './utils/dbConnect';
import dotenv from 'dotenv'
// import chatRoutes from './routes/chatRoutes';
dotenv.config()
connectDB()
const app = express();
app.use(cors({origin:"http://localhost:3000"}));

app.use(json());


app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

export default app;
