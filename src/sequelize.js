// sequelize.js
import { Sequelize } from 'sequelize';
import {env} from './config.js'

const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: env.DB_CONNECTION,
});

export default sequelize;