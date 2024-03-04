const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Partner = require('./partner');

const PartnerTranslation = sequelize.define('PartnerTranslation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Partner.hasMany(PartnerTranslation);
PartnerTranslation.belongsTo(Partner);

module.exports = PartnerTranslation;