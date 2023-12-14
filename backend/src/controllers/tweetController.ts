import { Request, Response } from 'express';
import Connection from '../dbHelper/dbHelper';
import { ExtendedUser, verifyToken } from '../middleware/verifyToken';

const dbHelpers = new Connection();

// Get a tweet by its ID
export const getTweetById = async (req: ExtendedUser, res: Response) => {
  try {
    const { tweetId } = req.params;

    const result = await dbHelpers.execute('getTweetByIdProc', { tweetId });

    res.status(200).json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get likes of a tweet
export const getTweetLikes = async (req: ExtendedUser, res: Response) => {
  try {
    const { tweetId } = req.params;

    const result = await dbHelpers.execute('getTweetLikesProc', { tweetId });

    res.status(200).json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get replies of a tweet
export const getTweetReplies = async (req: ExtendedUser, res: Response) => {
  try {
    const { tweetId } = req.params;

    const result = await dbHelpers.execute('getTweetRepliesProc', { tweetId });

    res.status(200).json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tweets of a user
export const getUserTweets = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id; 

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await dbHelpers.execute('getUserTweetsProc', { userId });

    res.status(200).json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a tweet
export const createTweet = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id; 
    const { tweet } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await dbHelpers.execute('createTweetProc', { userId, tweet });

    res.status(200).json({ message: 'Tweet created successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tweet
export const deleteTweet = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id; 
    const { tweetId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await dbHelpers.execute('deleteTweetProc', { userId, tweetId });

    res.status(200).json({ message: 'Tweet removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

