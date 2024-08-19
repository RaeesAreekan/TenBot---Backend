import { Request, Response } from 'express';
import Chat from '../models/chatModel';

export const saveChat = async (req: Request, res: Response) => {
  const { userId, messages } = req.body;
// Each user has an array of message in the database
  const chat = await Chat.findOne({ userId });

  if (chat) {
    chat.messages.push(...messages);
    await chat.save();
  } else {
    await Chat.create({ userId, messages });
  }

  res.status(200).json({ message: 'Chat history saved' });
}