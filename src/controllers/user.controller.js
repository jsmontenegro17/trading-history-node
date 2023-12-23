import User from "../models/user.js";
import UserRole from '../models/userRole.js';

import { validationResult } from "express-validator";


export const index = async (req, res) => {
    try {
      const users = await User.findAll();
  
      if (users.length === 0) return res.status(200).json({ message: 'No records found' });
  
      res.send(users);
  
    } catch (error) {
      console.error('error retrieving records from the user table:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};

  
export const show = async (req, res) => {
    try {
      
      const { id } = req.params;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
  
      res.send(user);
  
    } catch (error) {
      console.error('error retrieving record from the user table:', error);
      res.status(500).json({ message: 'eomething went wrong' });
    }
};

export const store = async (req, res) => {

    const { username, email, roles } = req.body;

    try {

        //Validacion los archivos de validacion esten validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.create({
            ...req.body
        });

        await UserRole.bulkCreate(
            roles.map(role => ({
              userId: user.id,
              roleId: role,
            }))
        );
      

        return res.json({user});

      } catch (error) {

        console.error('error creating user with role:', error);
        return res.status(500).json({ message: 'something went wrong' });

      }
}

export const update = async (req, res) => {

    const { id } = req.params;
    const { username, email, password } = req.body;


    try {

        //Validacion los archivos de validacion esten validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const [updatedCount, updatedUser] = await User.update(
            { username, email, password },
            { where: { id }, returning: true }
        );
    
        if (updatedUser === 0) {
            return res.status(404).json({ message: 'nothing found to update' });
        }

        // Eliminar los roles actuales del usuario en la tabla intermedia
        await UserRole.destroy({ where: { userId: id } });

        // Agregar los nuevos roles a la tabla intermedia
        const rolesToAdd = req.body.roles.map(roleId => ({ userId: id, roleId }));
        await UserRole.bulkCreate(rolesToAdd);

  
        const user = await User.findByPk(id);
        res.send(user);
  
    } catch (error) {
        console.error('error updating record in the user table:', error);
        res.status(500).json({ message: 'something went wrong' });
    }
};

export const destroy = async (req, res) => {
    try {
      const { id } = req.params;
  
      await UserRole.destroy({ where: { userId: id } });

      const deletedCount = await User.destroy({ where: { id } });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'nothing found to delete' });
      }

  
      res.sendStatus(204);
    } catch (error) {
      console.error('error deleting record from the Main table:', error);
      res.status(500).json({ message: 'something went wrong' });
    }
};