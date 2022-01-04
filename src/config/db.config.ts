import sqlite3 from 'sqlite3';
const sqlite3_module = sqlite3.verbose();
import {Sequelize, Dialect} from 'sequelize';

const dbConfig = {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectModule: sqlite3_module,
    storage: './database.sqlite',
    logging: false,
}

export default dbConfig;