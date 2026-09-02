/**
 * Heart2Heart - Index Router
 */

const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

router.get('/', feedController.getFeed);
router.get('/search', feedController.getSearch);
router.get('/moods', feedController.getMoods);

module.exports = router;
