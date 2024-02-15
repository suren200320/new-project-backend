const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Position = require('./position');

const PositionTranslation = sequelize.define('PositionTranslation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Position.hasMany(PositionTranslation);
PositionTranslation.belongsTo(Position);

module.exports = PositionTranslation;