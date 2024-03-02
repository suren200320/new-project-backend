const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Blog = require('./blog');

const BlogTranslation = sequelize.define('BlogTranslation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogId: {
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

Blog.hasMany(BlogTranslation);
BlogTranslation.belongsTo(Blog);

module.exports = BlogTranslation;