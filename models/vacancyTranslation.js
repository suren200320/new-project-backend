const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Vacancy = require('./vacancy');

const VacancyTranslation = sequelize.define('VacancyTranslation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Vacancy.hasMany(VacancyTranslation);
VacancyTranslation.belongsTo(Vacancy);

module.exports = VacancyTranslation;