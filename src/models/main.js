import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class Main extends Model {}

Main.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'main',
  tableName: 'main',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  underscored: true,
});


export default Main;
