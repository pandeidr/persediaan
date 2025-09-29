const express = require('express');
const router = express.Router();

// TODO: Implement vendors routes

router.get('/', (req, res) => {
  res.json({ message: 'vendors endpoints - coming soon' });
});

module.exports = router;
