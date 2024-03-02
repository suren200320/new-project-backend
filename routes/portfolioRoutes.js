const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const PortfolioTranslation = require('../models/blogTranslation');

router.post('/add', async (req, res) => {
    const { translation,image } = req.body;
    try {
        const newPortfolioItem = await portfolioController.addPortfolioItem(translation,image);
        res.status(201).json(newPortfolioItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await portfolioController.removePortfolioItem(id);
        res.status(200).json({ message: 'Blog item removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { translation,image} = req.body;
    try {
        const result = await portfolioController.editPortfolioItem(id,translation,image);
        res.status(200).json({ message: 'Blog item updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allPortfolioItems = await blogController.getAllPortfolioItem();
        res.status(200).json(allPortfolioItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/translations/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const allPortfolioTranslations = await blogController.getPortfolioDataByLanguage(language);
        res.status(200).json(allPortfolioTranslations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;