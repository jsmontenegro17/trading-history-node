import User from "../models/user.js";
import UserRole from '../models/userRole.js';
import Role from '../models/role.js';
import { env } from '../config.js';

import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";

export const signUp = async (req, res) => {

    const { username, email, roles } = req.body;

    try {

        //Validacion los archivos de validacion esten validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const newUser = await User.create({
            ...req.body
        });

        await UserRole.bulkCreate(
            roles.map(role => ({
              userId: newUser.id,
              roleId: role,
            }))
        );
      
        const token = jwt.sign({id:newUser.id}, env.SECRET, {
          expiresIn: 86400 //24 hours
        });

        return res.json({token});

      } catch (error) {

        console.error('error creating user with role:', error);
        return res.status(500).json({ message: 'something went wrong' });

      }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ 
      where: { email: email },
      include: [{ model: Role, attributes: ['id', 'name'] }],
    });

    if(!user) return res.status(400).json({message:'user not fount'});

    const matchPassword = await user.comparePassword(password);

    if(!matchPassword) return res.status(400).json({message:'invalid credentials'});

    const token = jwt.sign({id:user.id}, env.SECRET, {
      expiresIn: 86400 //24 hours
    })

    return res.json({token});

}