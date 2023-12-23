import jwt  from "jsonwebtoken";
import { env } from '../config.js';
import User from "../models/user.js";
import Role from "../models/role.js";

export const verifyToken = async (req, res, next) => {

    try {

        const tokenHeader = req.headers['authorization'];
    
        if(!tokenHeader) return res.status(403).json({message:'no token provided'});
    
        const [bearer, token] = tokenHeader.split(' ');
    
        if (!bearer || bearer.toLowerCase() !== 'bearer' || !token) return res.status(403).json({ message: 'invalid token format' });
    
        const decoded = jwt.verify(token, env.SECRET);
        req.userId = decoded.id;

        req.user = await User.findByPk(req.userId,{
            include: [{ model: Role, attributes: ['id', 'name'] }],
        });
    
        if(!req.user) return res.status(404).json({message:'no user found'});
    
        next();
        
    } catch (error) {
        return res.status(401).json({message:'unauthorized'});
    }


};

export const isAdmin = async (req, res, next) => {
    try {
      const userRoles = req.user.roles;
  
      if (userRoles && userRoles.some(role => role.name === 'admin')) {
        next();
      } else {
        return res.status(403).json({ message: 'unauthorized access. admin role is required.' });
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      return res.status(500).json({ message: 'something went wrong' });
    }
};

export const isTrader = async (req, res, next) => {
    try {
        const userRoles = req.user.roles;
    
        if (userRoles && userRoles.some(role => role.name === 'trader')) {
          next();
        } else {
          return res.status(403).json({ message: 'unauthorized access. trader role is required.' });
        }
    } catch (error) {

        console.error('Error checking trader role:', error);
        return res.status(500).json({ message: 'something went wrong' });
    }
}

export const isInvestor = async (req, res, next) => {
    try {
        const userRoles = req.user.roles;
    
        if (userRoles && userRoles.some(role => role.name === 'investor')) {
          next();
        } else {
          return res.status(403).json({ message: 'unauthorized access. investor role is required.' });
        }
    } catch (error) {

        console.error('Error checking investor role:', error);
        return res.status(500).json({ message: 'something went wrong' });
    }
}