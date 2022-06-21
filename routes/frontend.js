const express = require('express');

const frontendController = require('../controllers/frontend');

const router = express.Router();

router.get('/', frontendController.getIndex);

module.exports = router;
