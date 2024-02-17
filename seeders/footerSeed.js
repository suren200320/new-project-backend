const sequelize = require('../config/databaseConnections');
const FooterItem = require('../models/footerItem');
const faker = require('faker');

async function seed() {
    try {
        await sequelize.sync({ force: true });

        const locales = ['am', 'en', 'es'];

        const footerItems = locales.map(locale => ({
            address: faker.address.streetAddress(),
            phoneNumber: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            locale
        }));

        await FooterItem.bulkCreate(footerItems);

        console.log('Footer items seeded successfully');
    } catch (error) {
        console.error('Error seeding footer items:', error);
    }
}

seed();