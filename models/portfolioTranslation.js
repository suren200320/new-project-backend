const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Portfolio = require('./portfolio');

const PortfolioTranslation = sequelize.define('PortfolioTranslation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false
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

Portfolio.hasMany(PortfolioTranslation);
PortfolioTranslation.belongsTo(Portfolio);

module.exports = PortfolioTranslation;