import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";
import { v4 as uuidv4 } from "uuid";
import { updatUser, user } from "../types/userInterfaces";
import { generateToken } from "../services/tokenGenerator";
import {
  validateLoginUser,
  validateRegisterUser,
  validateResetpassword,
  validateUpdateuser,
  validateUserEmail,
  validateuserId,
} from "../validators/userValidator";
import { comparePass, hashPass } from "../services/passwordHash";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const procedureName = "getUsers";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateuserId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "getUserById";
    const result = await execute(procedureName, { user_id });

    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { user_name, password, email, fullName } = req.body;


    const { error } = validateRegisterUser.validate(req.body);

    if (error)
      return res.status(400).json({
        error:
          "check email or password ! password should be atleast 8 characters ",
      });

    const procedure1 = "getUserByEmail";
    const result = await execute(procedure1, { email });

    const userWithEmail =
      result.recordset && result.recordset.length > 0
        ? result.recordset[0]
        : undefined;

    if (userWithEmail) {
      return res
        .status(404)
        .json({ error: "Account exists with the given email" });
    }

    const newPassword = await hashPass(password);

    const newUser: user = {
      user_id: uuidv4(),
      user_name,
      email,
      password: newPassword,
      profileImage:
        "https://th.bing.com/th/id/R.eb6bc833d264d2e9f695d736836bb564?rik=g0KjEGcDgo30Hw&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fgeneric-avatar-icon-51.png&ehk=i3OIOsf6xtx%2bqaCLmwGi7hN4eDntLu%2f%2b9WxFbSVRYRo%3d&risl=&pid=ImgRaw&r=0",
      fullName,
    };

    const procedureName = "registerUser";
    const params = newUser;

    await execute(procedureName, params);

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const procedureName = "getUserByEmail";

    const { error } = validateLoginUser.validate(req.body);

    if (error)
      return res.status(400).json({
        error: "please check if entered password and email are correct",
      });

    const result = await execute(procedureName, { email });
    if (result) {
      const recordset = result.recordset;
      const user = recordset[0];


      if (!user) {
        return res.status(404).json({ error: "Account does not exist" });
      }

      const validPassword = await comparePass(password, user.password);

      if (!validPassword) {
        return res.status(404).json({ error: "Invalid password" });
      }

      const token = generateToken(
        user.email,
        user.user_id,
        user.user_name,
        user.fullName,
        user.isAdmin
      );
      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(404).json({ message: "Account does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { user_id, user_name, email, profileImage, fullName } = req.body;

    const { error } = validateUpdateuser.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ error: "Wrong credentials " });

    const newUser: updatUser = {
      user_id,
      user_name,
      email,
      profileImage,
      fullName,
    };

    const procedureName = "updateUser";
    const params = newUser;

    await execute(procedureName, params);
    return res.send({ message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(400).send({ error: "Id is required" });

    const { error } = validateuserId.validate(req.params);

    if (error) return res.status(400).send({ error: "Id is required" });

    const procedureName = "deleteUser";
    await execute(procedureName, { user_id });

    res.status(201).send({ message: "User deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).send({ message: "email is required" });

    const { error } = validateUserEmail.validate(req.body);
    

    if (error) {
      return res.status(400).send({ error: "enter a valid email" });
    }

    const procedure1 = "getUserByEmail";
    const result = await execute(procedure1, { email });

    const userWithEmail = result.recordset[0];

    if (!userWithEmail)
      return res.status(404).send({ error: "Invalid Email Provided " });

    const procedureName = "forgotPassword";
    await execute(procedureName, { user_id: userWithEmail.user_id });

    res
      .status(201)
      .send({ message: "check your email for a password reset link" });
  } catch (error) {
    console.log(error);
    res.send({ error: (error as Error).message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { user_id, password } = req.body;

    if (!user_id) return res.status(400).send({ error: "id is required" });
    if (!password)
      return res.status(400).send({ error: "password is required" });

    const { error } = validateResetpassword.validate(req.body);

    if (error) {
      return res.status(400).send({
        error:
          "check correct Email or password should be atleast 8 characters long with letters symbols and uppercase",
      });
    }

    const procedure1 = "getUserById";
    const result = await execute(procedure1, { user_id });

    const userWithId = result.recordset[0];

    if (!userWithId)
      return res.status(404).send({ error: "User Doesn't Exist" });

    const newPassword = await hashPass(password);

    const params = {
      user_id: userWithId.user_id,
      password: newPassword,
    };

    const procedureName = "resetPassword";

    await execute(procedureName, params);

    res.send({ message: "Password Updated succesfully" });
  } catch (error) {
    console.log(error);
    res.send({ error: (error as Error).message });
  }
};

export const checkUserDetails = async (request: any, res: Response) => {
  if (request.info) {
    return res.json({
      info: request.info,
    });
  }
};

