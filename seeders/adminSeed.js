const sequelize = require('../config/databaseConnections');
const Admin = require('../models/admin');
const faker = require('faker');

async function seed() {
    try {
        await sequelize.sync({ force: true });

        await Admin.create({
            username: 'admin',
            password: 'admin123'
        });

        console.log('Default admin created successfully');
    } catch (error) {
        console.error('Error seeding default admin:', error);
    }
}

seed();