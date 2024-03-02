const { where } = require("sequelize");
const BlogItem = require("../models/blog");
const BlogTranslation = require("../models/blogTranslation");

async function addBlogItem(translations, image) {
  try {
    const blogItem = await BlogItem.create({ image });
    await Promise.all(
      Object.keys(translations).map(async (language) => {
        await BlogTranslation.create({
          blogId: blogItem.id,
          language,
          title: translations[language].title,
          description: translations[language].description,
        });
      })
    );
    return true;
  } catch (error) {
    throw new Error("Error adding blog item ");
  }
}

async function removeBlogItem(id) {
  try {
    await BlogItem.destroy({ where: { id } });
    await BlogTranslation.destroy({ where: { blogId: id } });
    return true;
  } catch (error) {
    throw new Error("Error removing blog item");
  }
}

async function editBlogItem(id, translations,image) {
  try {
    await BlogItem.update(
      { image},
      { where: { id } }
    );
    
    await Promise.all(
        Object.keys(translations).map(async (language) => {
          await BlogTranslation.update({
            language,
            title: translations[language].title,
            description: translations[language].description,
          },
          {
            where:{blogId:id}
          }
          );
        })
      );

    return true;
  } catch (error) {
    throw new Error("Error editing blog item");
  }
}

async function getAllBlogItem() {
  try {
    const blogItems = await BlogItem.findAll();
    return blogItems;
  } catch (error) {
    throw new Error("Error getting all blog items");
  }
}

async function getBlogDataByLanguage(language){
    try {
        const blogTranslation = await BlogTranslation.findAll({where: language});
        return blogTranslation;
    } catch (error){
        throw new Error("Error getting all")
    }
}

module.exports = {
  addBlogItem,
  removeBlogItem,
  editBlogItem,
  getAllBlogItem,
  getBlogDataByLanguage,
};
