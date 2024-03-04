const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const PartnerItem = sequelize.define('PartnerItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mainImage: {
        type: DataTypes.TEXT,
    }
});


module.exports = PartnerItem;