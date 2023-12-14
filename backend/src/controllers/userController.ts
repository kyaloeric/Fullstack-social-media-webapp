import mssql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ExtendedUser, verifyToken } from '../middleware/verifyToken';
import {Request,Response, json} from 'express';
import { sqlConfig } from '../config/sqlConfig';
import { userUpdateValidator, loginValidator} from '../validators/userValidators';
import { LoginUserRequest, RegisterUserRequest, User } from '../interfaces/user'
import Connection from '../dbHelper/dbHelper';


dotenv.config();

const dbhelpers=new Connection;
const secret = process.env.SECRET || '';
export const registerUser = async (req: { body: RegisterUserRequest }, res: any) => {
    try {
      const user_id = uuidv4();
      const { gender, name,  email, password } = req.body;
      const hashedPwd = await bcrypt.hash(password, 8);
  
      const result = await dbhelpers.execute('CreateUser', {
        user_id,
        gender,
        email,
        password: hashedPwd,
        name,
      });
  
      if (result && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Registered successfully' });
      } else {
        return res.status(400).json({ message: 'Registration Failed' });
      }
    } catch (error: any) {
      return res.json({ Error: error.message });
    }
  };
  
// export const loginUser = async (req: { body: LoginUserRequest }, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const { error } = loginValidator.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: 'Invalid input data', details: error.details });
//     }

//     const user: User[] = (await dbhelpers.execute('loginUser', { email })).recordset;

//     if (user && user.length > 0) {
//       const hashedPwd = user[0].password;
//       const comparePassword = await bcrypt.compare(password, hashedPwd);

//       if (comparePassword) {
//         const { password, ...payload } = user[0];
//         const token = jwt.sign(payload, secret, { expiresIn: '300s' });
//         return res.status(200).json({ message: 'Logged in successfully', token });
//       } else {
//         return res.status(400).json({ message: 'Invalid password' });
//       }
//     } else {
//       return res.status(400).json({ message: 'Invalid login details' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
  
export const loginUser = async (req: { body: LoginUserRequest }, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input data', details: error.details });
    }

    const user: User[] = (await dbhelpers.execute('loginUser', { email })).recordset;

    if (user && user.length > 0) {
      const hashedPwd = user[0].password;
      const comparePassword = await bcrypt.compare(password, hashedPwd);

      if (comparePassword) {
        const { password, ...payload } = user[0];
        const token = jwt.sign(payload, secret, { expiresIn: '300s' });
        return res.status(200).json({ message: 'Logged in successfully', user_id: payload.user_id, token });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid login details' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateUser = async (req: { params: { user_id: string }; body: RegisterUserRequest }, res: any) => {
  try {
    const { user_id } = req.params;
    const {gender, name, email, password  } = req.body;

    const { error } = userUpdateValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input data', details: error.details });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await dbhelpers.execute('UpdateUser', {
      user_id,
      gender,
      email,
      password: hashedPwd,
      name,
    });

    if (result && result.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Details updated successfully' });
    } else {
      return res.status(400).json({ message: 'Details not updated' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};





  export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = (await dbhelpers.execute('fetchAllUsers')).recordset;
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  
  

//   export const checkCredentials=(req:Request,res:Response)=>{
//     if(req.info){
//         return res.json({
//             info: req.info
//         })
//     }
// }


export const checkCredentials = (req: ExtendedUser, res: Response) => {
    if (req.info) {
      return res.status(200).json({ info: req.info });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  };
  


export const getUserDetails=async(req:Request,res:Response)=>{

    try {

       const userId =req.params.userId
       console.log(userId);       
    
        const result = await dbhelpers.execute('GetUserDetails',{userId});
        const userDetails = result.recordset[0];

        console.log(userDetails);
        
        if (!userDetails) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json(userDetails);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


