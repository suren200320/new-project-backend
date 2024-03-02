const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');

const BlogItem = sequelize.define('BlogItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING
    }
});


module.exports = BlogItem;