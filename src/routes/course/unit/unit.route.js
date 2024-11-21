const express = require('express');
const UnitController = require('../../../controllers/course/unit.controller');

const router = express.Router();

// Routes for Units
router.post('/', UnitController.createUnit); // Create a new unit
router.get('/', UnitController.getAllUnits); // Get all units
router.get('/:id', UnitController.getUnitById); // Get a single unit by ID
router.put('/:id', UnitController.updateUnit); // Update a unit
router.delete('/:id', UnitController.deleteUnit); // Delete a unit

module.exports = router;
