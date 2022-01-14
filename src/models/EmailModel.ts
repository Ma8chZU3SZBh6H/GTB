import { DataTypes } from 'sequelize';
import sequelize from "./index";

const EmailModel = sequelize.define('email', {
    host: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    used: DataTypes.DATE,
    verified: DataTypes.DATE
}, );


export default EmailModel;