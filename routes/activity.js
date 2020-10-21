const express = require('express');

const controller = require('../controllers/activities');

const router = express.Router();

router.get('/:id', controller.getActivity);
router.get('/', controller.getAllActivities);
router.post('/', controller.createActivity);
router.put('/:id', controller.updateActivity);
router.delete('/:id', controller.deleteActivity);

module.exports = router;