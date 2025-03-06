const express = require('express');
const { downloadCSV, generateAssignments } = require('../controllers/secretSantaController');
// const { generateAssignments, downloadCSV } = require('../controllers/secretSantaController.js');

const router = express.Router();

router.get('/assign', generateAssignments);
router.get('/download', downloadCSV);

module.exports = router;
