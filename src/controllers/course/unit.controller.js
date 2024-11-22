const { Unit } = require('../../database/models');

const UnitController = {
    async createUnit(req, res) {
        try {
            const { courseId } = req.params;
            if (isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
            const { unitName, numericalOrder } = req.body;
            const unit = await Unit.create({ unitName, numericalOrder, courseId });
            res.status(201).json(unit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getAllUnits(req, res) {
        try {
            const { courseId } = req.params;
            if (isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
            const units = await Unit.findAll(
            { where: { courseId } }
            );
            res.status(200).json(units);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getUnitById(req, res) {
        try {
            const { courseId, id } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(id))) return res.status(400).json({ error: 'Id must be a number' });
            const unit = await Unit.findByPk(id, {
            where: { courseId },
            });
            if (!unit) return res.status(404).json({ error: 'Unit not found' });
            res.status(200).json(unit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async updateUnit(req, res) {
        try {
            const { courseId, id } = req.params;
            if (isNaN(parseInt(id)) || isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
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
            const { courseId, id } = req.params;
            if (isNaN(parseInt(id)) || isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
            const deleted = await Unit.destroy({ where: { unitId: id } });
            if (!deleted) return res.status(404).json({ error: 'Unit not found' });
            res.status(200).json({ message: 'Unit deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = UnitController;