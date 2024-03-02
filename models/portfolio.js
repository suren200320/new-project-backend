const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const ProtfolioItem = sequelize.define('PortfolioItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING
    }
});


module.exports = ProtfolioItem;