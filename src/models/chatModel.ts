import mongoose, { Document, Schema } from 'mongoose';

interface IChat extends Document {
  userId: string;
  messages: Array<{ message: string; timestamp: Date }>;
}

const chatSchema: Schema = new Schema({
  userId: { type: String, required: true },
  messages: [
    {
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model<IChat>('Chat', chatSchema);

export default Chat
