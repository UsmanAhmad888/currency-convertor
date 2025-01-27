const express = require('express');
const { convert } = require('../controllers/currencyController');

const router = express.Router();

router.get('/convert', convert);

module.exports = router;
