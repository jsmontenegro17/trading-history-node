// models/user.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';
import Role from './role.js';
import bcrypt from 'bcryptjs';

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  underscored: true,
  tableName: 'users',
  hooks: {
    // Antes de crear un nuevo usuario, encripta la contraseña
    beforeCreate: async (user) => {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    },
  },
});

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

User.belongsToMany(Role, { through: 'user_role' });

export default User;