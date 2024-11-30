import mongoose, { Document, Schema } from 'mongoose';


interface IChatSession{
  messages : Array<{ message: string; fromUser: boolean; timestamp: Date }>
}

interface IChat extends Document{
  email:string;
  sessions:Array<IChatSession>
}


const chatSchema : Schema = new Schema({

  email: {type: String, required:true},
  sessions: [
    {
      messages: [
        {
          message: { type: String, required: true },
          fromUser: { type: Boolean, required: true },
          timestamp: { type: Date, default: Date.now },
        },
      ]
    }
  ]


})

const Chat = mongoose.model<IChat>('Chat',chatSchema)

export default Chat



// interface IChat extends Document {
//   userId: string;
//   messages: Array<{ message: string; timestamp: Date }>;
// }

// const chatSchema: Schema = new Schema({
//   userId: { type: String, required: true },
//   messages: [
//     {
//       message: { type: String, required: true },
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
// });

// const Chat = mongoose.model<IChat>('Chat', chatSchema);

// export default Chat
