import { Router } from "express";
import {
  registerUser,

  updateUser,
  getAllUsers,
  getUserDetails,
  checkCredentials,
  loginUser,
} from "../controllers/userController";

import { verifyToken } from "../middleware/verifyToken";


// const { tokenVerfying } = require("../Middleware/tokenVerify");

const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/update/:user_id", updateUser);
userRoute.get('/',verifyToken,getAllUsers);
userRoute.get('/details/:user_id',verifyToken, getUserDetails);
userRoute.get('/checkUserDetails', verifyToken, checkCredentials);


export { userRoute };
