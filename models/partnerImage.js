const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Partner = require('./partner');

const PartnerImage = sequelize.define('PartnerImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.TEXT,

    }
});

Partner.hasMany(PartnerImage);
PartnerImage.belongsTo(Partner);

module.exports = PartnerImage;