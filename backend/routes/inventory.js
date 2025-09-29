const express = require('express');
const router = express.Router();

// TODO: Implement inventory routes

router.get('/', (req, res) => {
  res.json({ message: 'inventory endpoints - coming soon' });
});

module.exports = router;
