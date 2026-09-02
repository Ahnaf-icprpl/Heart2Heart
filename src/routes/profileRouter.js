/**
 * Heart2Heart - Profile Router
 */

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getMyProfile);
router.get('/:id', profileController.getUserProfile);
router.post('/switch', profileController.switchUser);
router.post('/edit', profileController.updateProfile);
router.post('/mood', profileController.logMood);

module.exports = router;
