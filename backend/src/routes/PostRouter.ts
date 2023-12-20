import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import { createPost, deletePost, editPost, getPost, getPostLikes, getPosts, toggleLikePost } from "../controllers/postController";

const post_router = Router();

post_router.post("/addnew/",verifyToken, createPost);
post_router.put("/edit",verifyToken, editPost);
post_router.delete("/:post_id", verifyToken, deletePost);
post_router.get('/getall', verifyToken, getPosts)
post_router.get("/:post_id", verifyToken, getPost);
post_router.post("/likePost",verifyToken, toggleLikePost);
post_router.get("/like/:post_id",verifyToken, getPostLikes);

export default post_router;
