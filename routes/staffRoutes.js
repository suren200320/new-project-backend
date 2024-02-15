const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/add', async (req, res) => {
    const { firstName, lastName, avatar, positions } = req.body;
    try {
        const newStaffMember = await staffController.addStaffMember(firstName, lastName, avatar, positions);
        res.status(201).json(newStaffMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await staffController.removeStaffMember(id);
        res.status(200).json({ message: 'Staff member removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, avatar } = req.body;
    try {
        const result = await staffController.editStaffMember(id, firstName, lastName, avatar);
        res.status(200).json({ message: 'Staff member updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allStaffMembers = await staffController.getAllStaffMembers();
        res.status(200).json(allStaffMembers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/positions/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const positions = await Position.findAll({
            include: [{
                model: PositionTranslation,
                where: { language },
                attributes: ['name']
            }]
        });
        res.status(200).json(positions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;