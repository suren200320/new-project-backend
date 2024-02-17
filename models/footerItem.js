const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const FooterItem = sequelize.define('FooterItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FooterItem;