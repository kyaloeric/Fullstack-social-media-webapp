import { Router } from "express";
import { getFollowersList,checkFollowing, getFollowingList, followUser, unfollowUser } from "../controllers/followerController";
import { verifyToken } from "../middleware/verifyToken";

const followerRoute = Router();

followerRoute.get("/followers/:user_id", verifyToken, getFollowersList);

followerRoute.get("/following/:user_id", verifyToken, getFollowingList);

followerRoute.post("/follow", verifyToken, followUser);

followerRoute.post("/unfollow", verifyToken, unfollowUser);

followerRoute.get("/check-following/:follower_user_id/:following_user_id", verifyToken, checkFollowing);





export { followerRoute };
