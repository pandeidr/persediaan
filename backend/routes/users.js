const express = require('express');
const router = express.Router();

// TODO: Implement users routes

router.get('/', (req, res) => {
  res.json({ message: 'users endpoints - coming soon' });
});

module.exports = router;
