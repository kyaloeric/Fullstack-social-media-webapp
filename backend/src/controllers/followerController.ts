import { Request, Response } from 'express';
import Connection from '../dbHelper/dbHelper';
import { ExtendedUser } from '../middleware/verifyToken';

const dbHelpers = new Connection();

// Get the list of people whom the user follows
export const getFollowingList = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await dbHelpers.execute('getFollowingListProc', { userId });

    res.status(200).json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get the list of people who follow the user
export const getFollowersList = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await dbHelpers.execute('getFollowersListProc', { userId });

    res.status(200).json(result.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Follow a user
export const followUser = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id;
    const { followerId } = req.body;

    if (!userId || !followerId) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check if the user is already following the target user
    const isAlreadyFollowing = await dbHelpers.execute('checkFollowingProc', { userId, followerId });

    if (isAlreadyFollowing.recordset.length > 0) {
      return res.status(400).json({ message: 'User is already being followed' });
    }

    // Insert a new record in the Followers table
    await dbHelpers.execute('followUserProc', { userId, followerId });

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req: ExtendedUser, res: Response) => {
  try {
    const userId = req.info?.user_id;
    const { followerId } = req.body;

    if (!userId || !followerId) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check if the user is following the target user
    const isFollowing = await dbHelpers.execute('checkFollowingProc', { userId, followerId });

    if (isFollowing.recordset.length === 0) {
      return res.status(400).json({ message: 'User is not being followed' });
    }

    // Delete the record from the Followers table
    await dbHelpers.execute('unfollowUserProc', { userId, followerId });

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



export const checkFollowing = async (req: ExtendedUser, res: Response) => {
  try {
    const followerUserId = req.info?.user_id;
    const followingUserId = req.params.following_user_id;

    if (!followerUserId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await dbHelpers.execute('checkFollowingProc', {
      follower_user_id: followerUserId,
      following_user_id: followingUserId,
    });

    res.status(200).json({ isFollowing: result.recordset.length > 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}