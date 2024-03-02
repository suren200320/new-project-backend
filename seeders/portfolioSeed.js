const sequelize = require("../config/databaseConnections");
const PortfolioTranslation = require("../models/portfolioTranslation");
const PortfolioItem = require("../models/portfolio");
const faker = require("faker");

async function seed() {
  try {
    await sequelize.sync({ force: true });

   

    const defaultPortfolioItems = [
      {
        title: "Portfolio1",
        description: "Description1",
        translations: [
          { title: "Պորտֆոլիո 1", description: "Տեքստ 1", language: "am" },
          { title: "Portfolio 1", description: "Description 1", language: "en" },
          { title: "Портфолио 1", description: "Описание 1", language: "ru" },
        ],
      },
      {
        title: "Portfolio1",
        description: "Description1",
        translations: [
          { title: "Պորտֆոլիո 2", description: "Տեքստ 2", language: "am" },
          { title: "Portfolio 2", description: "Description 2", language: "en" },
          { title: "Портфолио 2", description: "Описание 2", language: "ru" },
        ],
      },
      {
        title: "Portfolio3",
        description: "Description3",
        translations: [
          { title: "Պորտֆոլիո 3", description: "Տեքստ 3", language: "am" },
          { title: "Portfolio 3", description: "Description 3", language: "en" },
          { title: "Портфолио 3", description: "Описание 3", language: "ru" },
        ],
      },
      {
        title: "Portfolio2",
        description: "Description2",
        translations: [
          { title: "Պորտֆոլիո 4", description: "Տեքստ 4", language: "am" },
          { title: "Portfolio 4", description: "Description 4", language: "en" },
          { title: "Портфолио 4", description: "Описание 4", language: "ru" },
        ],
      }
    ];

    const PortfolioItems = await Promise.all(
      defaultPortfolioItems.map(async (defaultPortfolioItem) => {
        const portfolioItem = await PortfolioItem.create({ title: defaultPortfolioItem.title });
        await Promise.all(
          defaultPortfolioItem.translations.map(async (translation) => {
            await PortfolioTranslation.create({
              title: translation.title,
              description: translation.description,
              language: translation.language,
              portfolioId: portfolioItem.id,
            });
          })
        );
        return PortfolioItem;
      })
    );

    // const staffMembers = [];
    // for (let i = 0; i < 5; i++) {
    //   const firstName = faker.name.firstName();
    //   const lastName = faker.name.lastName();
    //   const avatar = faker.image.avatar();
    //   const randomPosition =
    //     positions[Math.floor(Math.random() * positions.length)];
    //   staffMembers.push({
    //     firstName,
    //     lastName,
    //     avatar,
    //     PositionId: randomPosition.id,
    //   });
    // }
    // await StaffMember.bulkCreate(staffMembers);

    console.log("Default data seeded successfully");
  } catch (error) {
    console.error("Error seeding default data:", error);
  }
}

seed();
