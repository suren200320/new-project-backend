const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');

router.post('/add', async (req, res) => {
    const { translation,image } = req.body;
    try {
        const newBlogItem = await BlogController.addBlogItem(translation,image);
        res.status(201).json(newBlogItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BlogController.removeBlogItem(id);
        res.status(200).json({ message: 'Blog item removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { translation,image} = req.body;
    try {
        await BlogController.editBlogItem(id,translation,image);
        res.status(200).json({ message: 'Blog item updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allBlogItems = await BlogController.getAllBlogItem();
        res.status(200).json(allBlogItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/translations/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const allBlogTranslations = await BlogController.getBlogDataByLanguage(language);
        res.status(200).json(allBlogTranslations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;