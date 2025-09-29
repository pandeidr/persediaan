const express = require('express');
const router = express.Router();

// TODO: Implement customers routes

router.get('/', (req, res) => {
  res.json({ message: 'customers endpoints - coming soon' });
});

module.exports = router;
