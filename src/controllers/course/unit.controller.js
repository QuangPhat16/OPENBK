const { Unit } = require('../../database/models');

const UnitController = {
    async createUnit(req, res) {
        try {
            const { unitName, numericalOrder, courseId } = req.body;
            const unit = await Unit.create({ unitName, numericalOrder, courseId });
            res.status(201).json(unit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getAllUnits(req, res) {
        try {
            const units = await Unit.findAll({
            include: [{ model: Question, as: 'questions' }], // Include related questions
            });
            res.status(200).json(units);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getUnitById(req, res) {
        try {
            const { id } = req.params;
            const unit = await Unit.findByPk(id, {
            include: [{ model: Question, as: 'questions' }],
            });
            if (!unit) return res.status(404).json({ error: 'Unit not found' });
            res.status(200).json(unit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async updateUnit(req, res) {
        try {
            const { id } = req.params;
            const { unitName, numericalOrder } = req.body;
            const updated = await Unit.update(
            { unitName, numericalOrder },
            { where: { unitId: id } }
            );
            if (!updated[0]) return res.status(404).json({ error: 'Unit not found' });
            res.status(200).json({ message: 'Unit updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async deleteUnit(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Unit.destroy({ where: { unitId: id } });
            if (!deleted) return res.status(404).json({ error: 'Unit not found' });
            res.status(200).json({ message: 'Unit deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = UnitController;