const express = require('express');
const router = express.Router();

// TODO: Implement reports routes

router.get('/', (req, res) => {
  res.json({ message: 'reports endpoints - coming soon' });
});

module.exports = router;
