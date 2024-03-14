const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Partner = require('./partner');

const PartnerSocial = sequelize.define('PartnerSocial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
});

Partner.hasMany(PartnerSocial);
PartnerSocial.belongsTo(Partner);

module.exports = PartnerSocial;