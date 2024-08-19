import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';

const app = express();

app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

export default app;
