const express = require('express');
const router = express.Router();

// TODO: Implement dashboard routes

router.get('/', (req, res) => {
  res.json({ message: 'dashboard endpoints - coming soon' });
});

module.exports = router;
