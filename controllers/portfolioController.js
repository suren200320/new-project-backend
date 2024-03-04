const { where } = require("sequelize");
const PortfolioItem = require("../models/portfolio");
const PortfolioTranslation = require("../models/portfolioTranslation");

async function addPortfolioItem(translations, image) {
  try {
    const portfolioItem = await PortfolioItem.create({ image });
    await Promise.all(
      Object.keys(translations).map(async (language) => {
        await PortfolioTranslation.create({
          portfolioId: portfolioItem.id,
          language,
          title: translations[language].title,
          description: translations[language].description,
        });
      })
    );
    return true;
  } catch (error) {
    throw new Error("Error adding portfolio item ");
  }
}

async function removePortfolioItem(id) {
  try {
    await PortfolioItem.destroy({ where: { id } });
    await PortfolioTranslation.destroy({ where: { portfolioId: id } });
    return true;
  } catch (error) {
    throw new Error("Error removing portfolio item");
  }
}

async function editPortfolioItem(id, translations,image) {
  try {
    await PortfolioItem.update(
      { image},
      { where: { id } }
    );
    
    await Promise.all(
        Object.keys(translations).map(async (language) => {
          await PortfolioTranslation.update({
            language,
            title: translations[language].title,
            description: translations[language].description,
          },
          {
            where:{portfolioId:id}
          }
          );
        })
      );

    return true;
  } catch (error) {
    throw new Error("Error editing portfolio item");
  }
}

async function getAllPortfolioItem() {
  try {
    const portfolioItems = await PortfolioItem.findAll();
    return portfolioItems;
  } catch (error) {
    throw new Error("Error getting all portfolio items");
  }
}

async function getPortfolioDataByLanguage(language){
    try {
        const portfolioTranslation = await PortfolioTranslation.findAll({where: {language}});
        return portfolioTranslation;
    } catch (error){
        throw new Error("Error getting all")
    }
}

module.exports = {
  addPortfolioItem,
  removePortfolioItem,
  editPortfolioItem,
  getAllPortfolioItem,
  getPortfolioDataByLanguage,
};
