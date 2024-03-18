const VacancyItem = require("../models/vacancy");
const VacancyTranslation = require("../models/vacancyTranslation");

async function addVacancyItem(translations, image,date) {
  try {
    const vacancyItem = await VacancyItem.create({ image,date });
    await Promise.all(
      Object.keys(translations).map(async (language) => {
        await VacancyTranslation.create({
          language,
          title: translations[language].title,
          description: translations[language].description,
          VacancyItemId: vacancyItem.id
        });
      })
    );
    return true;
  } catch (error) {
    throw new Error("Error adding vacancy item ");
  }
}

async function removeVacancyItem(id) {
  try {
    await VacancyItem.destroy({ where: { id } });
    await VacancyTranslation.destroy({ where: { VacancyItemId: id } });
    return true;
  } catch (error) {
    throw new Error("Error removing vacancy item");
  }
}

async function editVacancyItem(id, translations, image,date) {
  try {
    await VacancyItem.update({ image,date }, { where: { id } });

    await Promise.all(
      Object.keys(translations).map(async (language) => {
        await VacancyTranslation.update(
          {
            language,
            title: translations[language].title,
            description: translations[language].description,
          },
          {
            where: { VacancyItemId: id },
          }
        );
      })
    );

    return true;
  } catch (error) {
    throw new Error("Error editing vacancy item");
  }
}

async function getAllVacancyItem() {
  try {
    const vacancyItems = await VacancyItem.findAll();
    return vacancyItems;
  } catch (error) {
    throw new Error("Error getting all vacancy items");
  }
}

async function getVacancyDataByLanguage(language) {
  try {
    const vacancyTranslation = await VacancyTranslation.findAll({
      where: { language },
    });
    return vacancyTranslation;
  } catch (error) {
    throw new Error("Error getting all");
  }

}

module.exports = {
  addVacancyItem,
  removeVacancyItem,
  editVacancyItem,
  getAllVacancyItem,
  getVacancyDataByLanguage,
};
