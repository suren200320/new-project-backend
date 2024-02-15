const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ where: { username, password } });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ adminId: admin.id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};