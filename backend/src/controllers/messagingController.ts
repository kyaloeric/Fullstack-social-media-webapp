import { Request, Response } from 'express';
import Connection from '../dbHelper/dbHelper';
import { ExtendedUser } from '../middleware/verifyToken';

const db = new Connection();

// Send a message
export const sendMessage = async (req: ExtendedUser, res: Response) => {
  try {
    const senderId = req.info?.user_id; 
    const { receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Ensure that both users exist before sending the message
    const senderExists = await db.execute('userExistsProc', { userId: senderId });
    const receiverExists = await db.execute('userExistsProc', { userId: receiverId });

    if (!senderExists.recordset[0] || !receiverExists.recordset[0]) {
      return res.status(404).json({ message: 'One or more users do not exist' });
    }

    // Insert the message into the database
    await db.execute('sendMessageProc', { senderId, receiverId, message });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get chat history between two users
export const getChatHistory = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id; 
    const { otherUserId } = req.params;

    if (!userId || !otherUserId) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Ensure that both users exist before retrieving the chat history
    const userExists = await db.execute('userExistsProc', { userId });
    const otherUserExists = await db.execute('userExistsProc', { userId: otherUserId });

    if (!userExists.recordset[0] || !otherUserExists.recordset[0]) {
      return res.status(404).json({ message: 'One or more users do not exist' });
    }

    // Retrieve the chat history from the database
    const chatHistory = await db.execute('getChatHistoryProc', { userId, otherUserId });

    res.status(200).json(chatHistory.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
