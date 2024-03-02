const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const BlogTranslation = require('../models/blogTranslation');

router.post('/add', async (req, res) => {
    const { translation,image } = req.body;
    try {
        const newBlogItem = await blogController.addBlogItem(translation,image);
        res.status(201).json(newBlogItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await blogController.removeBlogItem(id);
        res.status(200).json({ message: 'Blog item removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { translation,image} = req.body;
    try {
        const result = await blogController.editBlogItem(id,translation,image);
        res.status(200).json({ message: 'Blog item updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allBlogItems = await blogController.getAllBlogItem();
        res.status(200).json(allBlogItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/translations/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const allBlogTranslations = await blogController.getBlogDataByLanguage(language);
        res.status(200).json(allBlogTranslations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;