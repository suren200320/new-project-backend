const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnections');
const Position = require('./position');

const StaffMember = sequelize.define('StaffMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING
    }
});

StaffMember.belongsTo(Position);

module.exports = StaffMember;