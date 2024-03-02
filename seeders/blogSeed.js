const sequelize = require("../config/databaseConnections");
const BlogTranslation = require("../models/blogTranslation");
const BlogItem = require("../models/blog");
const faker = require("faker");

async function seed() {
  try {
    await sequelize.sync({ force: true });

   

    const defaultBlogItems = [
      {
        title: "Blog1",
        description: "Description1",
        translations: [
          { title: "Բլոգ 1", description: "Տեքստ 1", language: "am" },
          { title: "Blog 1", description: "Description 1", language: "en" },
          { title: "Блог 1", description: "Описание 1", language: "ru" },
        ],
      },
      {
        title: "Blog1",
        description: "Description1",
        translations: [
          { title: "Բլոգ 2", description: "Տեքստ 2", language: "am" },
          { title: "Blog 2", description: "Description 2", language: "en" },
          { title: "Блог 2", description: "Описание 2", language: "ru" },
        ],
      },
      {
        title: "Blog3",
        description: "Description3",
        translations: [
          { title: "Բլոգ 3", description: "Տեքստ 3", language: "am" },
          { title: "Blog 3", description: "Description 3", language: "en" },
          { title: "Блог 3", description: "Описание 3", language: "ru" },
        ],
      },
      {
        title: "Blog2",
        description: "Description2",
        translations: [
          { title: "Բլոգ 4", description: "Տեքստ 4", language: "am" },
          { title: "Blog 4", description: "Description 4", language: "en" },
          { title: "Блог 4", description: "Описание 4", language: "ru" },
        ],
      }
    ];

    const blogItems = await Promise.all(
      defaultBlogItems.map(async (defaultBlogItem) => {
        const blogItem = await BlogItem.create({ title: defaultBlogItem.title });
        await Promise.all(
          defaultBlogItem.translations.map(async (translation) => {
            await BlogTranslation.create({
              title: translation.title,
              description: translation.description,
              language: translation.language,
              blogId: blogItem.id,
            });
          })
        );
        return blogItem;
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
