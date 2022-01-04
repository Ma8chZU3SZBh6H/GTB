import dbConfig from "../config/db.config";
import {Sequelize} from 'sequelize';
import "./AppModel";
import "./EmailModel";

const sequelize = new Sequelize('database', '', '', {
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    dialectModule: dbConfig.dialectModule,
    dialect: 'sqlite',
    storage: dbConfig.storage,
    logging: dbConfig.logging,
});

export default sequelize;
