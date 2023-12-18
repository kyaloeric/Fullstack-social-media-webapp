import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import { followingPosts, getFollowers, getFollowings, toggleFollowUser } from "../controllers/followController";

const follow_router = Router();

follow_router.post("/followUser",verifyToken, toggleFollowUser);
follow_router.get("/getUserFollowers/:followed_user_id",verifyToken, getFollowers);
follow_router.get("/getuserFollowings/:following_user_id", verifyToken, getFollowings);
follow_router.get("/followingPosts/:following_user_id", followingPosts);



export default follow_router;
