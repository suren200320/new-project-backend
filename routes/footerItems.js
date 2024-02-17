const express = require('express');
const router = express.Router();
const FooterItem = require('../models/footerItem');

router.get('/footer/:locale', async (req, res) => {
  const { locale } = req.params;

  try {
    const footerItems = await FooterItem.findAll({ where: { locale } });
    res.json(footerItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/footer/:locale', async (req, res) => {
  const { locale } = req.params;
  const { address, phoneNumber, email } = req.body;

  try {
    await FooterItem.update(
      { address, phoneNumber, email },
      { where: { locale } }
    );
    res.json({ message: 'Footer items updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;