const express = require('express');
const router = express.Router();

// TODO: Implement invoices routes

router.get('/', (req, res) => {
  res.json({ message: 'invoices endpoints - coming soon' });
});

module.exports = router;
