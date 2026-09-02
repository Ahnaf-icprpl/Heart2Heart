/**
 * Heart2Heart - Circle Router
 */

const express = require('express');
const router = express.Router();
const circleController = require('../controllers/circleController');

router.get('/', circleController.getAllCircles);
router.get('/:id', circleController.getCircleDetail);
router.post('/:id/join', circleController.toggleJoinCircle);

module.exports = router;
