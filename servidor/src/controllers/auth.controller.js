import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import { createTokenAccess } from "../libs/jws.js";

export const register = async (req, res) =>  {
    const {email, password, username}=req.body;
    // console.log(email,password,username)
    // res.send('Regitrando')
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User ({
            username,
            email,
            password: passwordHash
        })
        const userSaved = await newUser.save();
        const token = await createTokenAccess ({ id:userSaved._id})
        res.cookie('token', token)
        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        });
    } catch (error) {
        res.status(500).json({messege: error.messege});
    }
}
export const login = (req, res) => res.send("login");