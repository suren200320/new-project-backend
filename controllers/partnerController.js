const PartnerItem = require("../models/partner");
const PartnerTranslation = require("../models/partnerTranslation");
const PartnerImage = require("../models/partnerImage");
const PartnerSocial = require("../models/partnerSocial");
const PartnerCategory = require("../models/partnerCategory");

async function addPartnerItem(translations,images,categoryKey,socials) {
  const mainImage = images.find(item=> item.isMain).url
  try {

    const partnerItem = await PartnerItem.create({ mainImage ,categoryKey});
    await Promise.all(
      Object.keys(translations).map(async (language) => {
        await PartnerTranslation.create({
          PartnerItemId: partnerItem.id,
          language,
          title: translations[language].title,
          description: translations[language].description,
        });
      })
      
    );
    await Promise.all(
      images.map(async (image)=>{
        await PartnerImage.create({
          PartnerItemId: partnerItem.id,
          image: image.url
        })
      })
    )
    await Promise.all(
      socials.map(async (social)=>{
        await PartnerSocial.create({
          PartnerItemId: partnerItem.id,
          name: social.name,
          url: social.url
        })
      })
    )
    return true;
  } catch (error) {
    throw new Error("Error adding partner item ");
  }
}

async function removePartnerItem(id) {
  try {
    await PartnerItem.destroy({ where: { id } });
    await PartnerTranslation.destroy({ where: { PartnerItemId: id } });
    await PartnerImage.destroy({ where: {PartnerItemId: id}})
    await PartnerSocial.destroy({ where: {PartnerItemId: id}})
    return true;
  } catch (error) {
    throw new Error("Error removing partner item");
  }
}

async function editPartnerItem(id, translations,images,categoryKey,socials) {
  const mainImage = images.find(image => image.isMain)
  try {
    await PartnerItem.update(
      { mainImage},
      {categoryKey},
      { where: { id } }
    );
    
    await Promise.all(
        Object.keys(translations).map(async (language) => {
          await PartnerTranslation.update({
            language,
            title: translations[language].title,
            description: translations[language].description,
          },
          {
            where:{PartnerItemId:id}
          }
          );
        })
        
      );
      await Promise.all(
        images.map(async (image) => {
          await PartnerImage.update({
            image: image.url
          },
          {
            where:{PartnerItemId: id}
          })
        })  
      )
      await Promise.all(
        socials.map(async (social) => {
          await PartnerImage.update({
            url: social.url
          },
          {
            where:{id: social.id}
          })
        })  
      )

    return true;
  } catch (error) {
    throw new Error("Error editing partner item");
  }
}

async function getAllPartnerItem() {
  try {
    const partnerItems = await PartnerItem.findAll();
    return partnerItems;
  } catch (error) {
    throw new Error("Error getting all partner items");
  }
}

async function getPartnerDataByLanguage(language){
    try {
        const partnerTranslation = await PartnerTranslation.findAll({where: {language}});
        return partnerTranslation;
    } catch (error){
        throw new Error("Error getting all")
    }
}

async function getPartnerImages(id){
  try{
    const partnerImages = await PartnerImage.findAll({where: {PartnerItemId:id}})
    return partnerImages;
  } catch(error){
    throw new Error("Error getting images")
  }
}

async function addPartnerCategory(translations,key){
  try{
    await Promise.all(
      Object.keys(translations).map(async (language) => {
        await PartnerCategory.create({
          language,
          name: translations[language].name,
          key
        });
      })
    );
  } catch(error){
    throw new Error("Error adding category")
  }
}

async function removePartnerCategory(id){
  try{
    await PartnerCategory.destroy({where :{id}})
  } catch(error){
    throw new Error("Error removing category")
  }
}

async function getPartnerCategories(){
  try{
    const categories = await PartnerCategory.findAll();
    return categories;
  } catch(error){
    throw new Error("Error getting categories")
  }
}

module.exports = {
  addPartnerItem,
  removePartnerItem,
  editPartnerItem,
  getAllPartnerItem,
  getPartnerDataByLanguage,
  getPartnerImages,
  addPartnerCategory,
  removePartnerCategory,
  getPartnerCategories
};
