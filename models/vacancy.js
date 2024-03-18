const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const VacancyItem = sequelize.define('VacancyItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
});


module.exports = VacancyItem;