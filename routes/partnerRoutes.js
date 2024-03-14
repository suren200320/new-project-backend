const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

router.post('/add', async (req, res) => {
    const { translations,images } = req.body;
    try {
        const newPartnerItem = await partnerController.addPartnerItem(translations,images);
        res.status(201).json(newPartnerItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await partnerController.removePartnerItem(id);
        res.status(200).json({ message: 'Partner item removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { translation,images} = req.body;
    try {
        await partnerController.editPartnerItem(id,translation,images);
        res.status(200).json({ message: 'Partner item updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allPartnerItems = await partnerController.getAllPartnerItem();
        res.status(200).json(allPartnerItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/translations/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const allPartnerTranslations = await partnerController.getPartnerDataByLanguage(language);
        res.status(200).json(allPartnerTranslations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/images/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const allPartnerImages = await partnerController.getPartnerImages(id);
        res.status(200).json(allPartnerImages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/category/add', async (req, res) => {
    const { translations,key } = req.body;
    try {
        const newPartnerCategory = await partnerController.addPartnerCategory(translations,key);
        res.status(201).json(newPartnerCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/category/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await partnerController.removePartnerCategory(id);
        res.status(200).json({ message: 'Category item removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/category/list', async (req, res) => {
    try {
        const allCategoryItems = await partnerController.getPartnerCategories();
        res.status(200).json(allCategoryItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;