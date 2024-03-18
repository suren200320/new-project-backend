const express = require('express');
const router = express.Router();
const VacancyController = require('../controllers/vacancyController');

router.post('/add', async (req, res) => {
    const { translation,image ,date} = req.body;
    try {
        const newVacancyItem = await VacancyController.addVacancyItem(translation,image,date);
        res.status(201).json(newVacancyItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await VacancyController.removeVacancyItem(id);
        res.status(200).json({ message: 'Vacancy item removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { translation,image,date} = req.body;
    try {
        await VacancyController.editVacancyItem(id,translation,image,date);
        res.status(200).json({ message: 'Vacancy item updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allVacancyItems = await VacancyController.getAllVacancyItem();
        res.status(200).json(allVacancyItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/translations/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const allVacancyTranslations = await BlogController.getVacancyDataByLanguage(language);
        res.status(200).json(allVacancyTranslations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;