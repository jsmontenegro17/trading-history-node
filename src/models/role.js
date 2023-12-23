// models/role.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.js';

class Role extends Model {}

Role.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'role',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  underscored: true,
  tableName: 'roles', // Puedes cambiar 'roles' por el nombre de tu tabla si es diferente
});

export default Role;