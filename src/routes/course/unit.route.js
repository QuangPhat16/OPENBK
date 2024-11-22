const express = require('express');
const UnitController = require('../../controllers/course/unit.controller');

const router = express.Router();
const basepath = '/:courseId/unit/';

router.post(`${basepath}`, UnitController.createUnit); // Create a new unit
router.get(`${basepath}`, UnitController.getAllUnits); // Get all units
router.get(`${basepath}:id`, UnitController.getUnitById); // Get a single unit by ID
router.put(`${basepath}:id`, UnitController.updateUnit); // Update a unit
router.delete(`${basepath}:id`, UnitController.deleteUnit); // Delete a unit

module.exports = router;
