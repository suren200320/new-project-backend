const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const Position = sequelize.define('Position', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Position;