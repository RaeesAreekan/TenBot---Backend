import { Request, Response } from 'express';
import Chat from '../models/chatModel';
import { Session } from 'inspector';


export const saveChatSession = async(req:Request,res:Response)=>{

  const {email,messages} = req.body

  try{

    const chat = await Chat.findOne({email})


    if(chat){
      chat.sessions.push({messages})
      await chat.save()
    }
    else{
      await Chat.create({email,sessions:[{messages}]})
    }

    res.status(200).json({ message: 'Chat session saved successfully' })

  }
  catch(err){
    res.status(500).json({error: 'Error saving chat session'})

  }

}



export const getChatHistory = async(req:Request,res:Response)=>{

  const {email} = req.params

  try{

    const chat = await Chat.findOne({email})

    if (!chat) return res.status(404).json({ message: 'No chat history found' });    // Look out for this , in the case where the user is new //

    res.status(200).json(chat.sessions.map((session, index) => ({
      sessionId: index,
      firstMessage: session.messages[0]?.message || 'No messages',
      timestamp: session.messages[0]?.timestamp || new Date(),
    })))

  }
  catch(err){
    res.status(500).json({error: 'Error fetching chat history'})
  }
}


export const getChatSession = async(req:Request,res:Response)=>{

  const { email, sessionId } = req.params; // Use email instead of userId

  try {
    const chat = await Chat.findOne({ email });

    const sessionInd = parseInt(sessionId,10)
    if (!chat || isNaN(sessionInd) || !chat.sessions[sessionInd]) {
      return res.status(404).json({ message: 'Chat session not found' });
    }

    res.status(200).json(chat.sessions[sessionInd].messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat session' });
  }
}

// export const saveChat = async (req: Request, res: Response) => {
//   const { userId, messages } = req.body;
// // Each user has an array of message in the database
//   const chat = await Chat.findOne({ userId });

//   if (chat) {
//     chat.messages.push(...messages);
//     await chat.save();
//   } else {
//     await Chat.create({ userId, messages });
//   }

//   res.status(200).json({ message: 'Chat history saved' });
// }