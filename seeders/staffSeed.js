const sequelize = require('../config/databaseConnections');
const Position = require('../models/position');
const PositionTranslation = require('../models/positionTranslation');
const StaffMember = require('../models/staffMember');
const faker = require('faker');

async function seed() {
    try {
        await sequelize.sync({ force: true });

        const defaultPositions = [
            { name: 'Manager', translations: [{ name: 'Manager', language: 'am' }, { name: 'Manager', language: 'en' }, { name: 'Manager', language: 'ru' }] },
            { name: 'Developer', translations: [{ name: 'Developer', language: 'am' }, { name: 'Développeur', language: 'en' }, { name: 'Desarrollador', language: 'ru' }] },
            { name: 'Designer', translations: [{ name: 'Designer', language: 'am' }, { name: 'Designer', language: 'en' }, { name: 'Diseñador', language: 'ru' }] },
            { name: 'Marketing Specialist', translations: [{ name: 'Marketing Specialist', language: 'am' }, { name: 'Spécialiste en marketing', language: 'en' }, { name: 'Especialista en marketing', language: 'ru' }] },
            { name: 'Sales Representative', translations: [{ name: 'Sales Representative', language: 'am' }, { name: 'Représentant des ventes', language: 'en' }, { name: 'Representante de ventas', language: 'ru' }] }
        ];

        const positions = await Promise.all(defaultPositions.map(async defaultPosition => {
            const position = await Position.create({ name: defaultPosition.name });
            await Promise.all(defaultPosition.translations.map(async translation => {
                await PositionTranslation.create({
                    name: translation.name,
                    language: translation.language,
                    PositionId: position.id
                });
            }));
            return position;
        }));

        const staffMembers = [];
        for (let i = 0; i < 5; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const avatar = faker.image.avatar();
            const randomPosition = positions[Math.floor(Math.random() * positions.length)];
            staffMembers.push({ firstName, lastName, avatar, PositionId: randomPosition.id });
        }
        await StaffMember.bulkCreate(staffMembers);

        console.log('Default data seeded successfully');
    } catch (error) {
        console.error('Error seeding default data:', error);
    }
}

seed();