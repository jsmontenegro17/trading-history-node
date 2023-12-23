import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.js';
import Role from './role.js';

class UserRole extends Model {}

UserRole.init({}, {
  sequelize,
  modelName: 'userRole',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  underscored: true,
  tableName: 'user_role'
});


User.hasMany(UserRole);
UserRole.belongsTo(User);

Role.hasMany(UserRole);
UserRole.belongsTo(Role);

export default UserRole;