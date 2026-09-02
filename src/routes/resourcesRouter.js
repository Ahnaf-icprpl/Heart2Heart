/**
 * Heart2Heart - Resources & Breathing Router
 */

const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/', resourceController.getResources);
router.get('/breathing', resourceController.getBreathingRoom);

module.exports = router;
