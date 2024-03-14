const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const PartnerCategory = sequelize.define('PartnerCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING,

    },
    name: {
        type: DataTypes.STRING,

    },
    language: {
        type: DataTypes.STRING,
    }
});


module.exports = PartnerCategory;