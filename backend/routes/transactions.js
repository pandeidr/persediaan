const express = require('express');
const router = express.Router();

// TODO: Implement transactions routes

router.get('/', (req, res) => {
  res.json({ message: 'transactions endpoints - coming soon' });
});

module.exports = router;
