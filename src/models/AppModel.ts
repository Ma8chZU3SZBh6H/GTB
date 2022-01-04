import { DataTypes } from 'sequelize';
import sequelize from "./index";

const AppModel = sequelize.define('app', {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
    },
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    header_image: DataTypes.STRING,
    synced_at: DataTypes.DATE,
}, );

export default AppModel;