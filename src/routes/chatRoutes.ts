import express from 'express';
import { saveChatSession, getChatHistory, getChatSession } from '../controllers/chatController';

const router = express.Router();

router.post('/save', saveChatSession);
router.get('/history/:email', getChatHistory); // Use email instead of userId
router.get('/session/:email/:sessionId', getChatSession); // Use email instead of userId

export default router;
