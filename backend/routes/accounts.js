const express = require('express');
const router = express.Router();

// TODO: Implement accounts routes

router.get('/', (req, res) => {
  res.json({ message: 'accounts endpoints - coming soon' });
});

module.exports = router;
