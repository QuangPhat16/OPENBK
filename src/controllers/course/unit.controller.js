const { Unit } = require('../../database/models');

const UnitController = {
    async createUnit(req, res) {
        try {
            const { courseID } = req.params;
            const { unitName } = req.body;

            const course = await Course.findByPk(courseID);
            if (!course) return res.status(404).json({ error: 'Course not found' });

            await Unit.create({ unitName, courseID });
            return res.status(201).json({ message: 'Created unit successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
  
    async getAllUnits(req, res) {
        try {
            const { courseID } = req.params;
            const units = await Unit.findAll(
                { where: { courseID, } }
            );
            return res.status(200).json(units);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
  
    // async getUnitByID(req, res) {
    //     try {
    //         const { courseID, id } = req.params;
    //         if (isNaN(parseInt(courseID)) || isNaN(parseInt(id))) return res.status(400).json({ error: 'ID must be a number' });
    //         const unit = await Unit.findByPk(id, {
    //         where: { courseID },
    //         });
    //         if (!unit) return res.status(404).json({ error: 'Unit not found' });
    //         res.status(200).json(unit);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
  
    async updateUnit(req, res) {
        try {
            const { unitName, numericalOrder, unitID } = req.body;
            const updated = await Unit.update(
                { unitName, numericalOrder },
                { where: { unitID,}, }
            );
            if (!updated[0]) return res.status(404).json({ error: 'Unit not found' });
            return res.status(200).json({ message: 'Unit updated successfully' });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
  
    async deleteUnit(req, res) {
        try {
            const unitID = req.body
            const deleted = await Unit.destroy({ where: { unitID, }, });
            if (!deleted) return res.status(404).json({ error: 'Unit not found' });
            return res.status(200).json({ message: 'Unit deleted successfully' });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = UnitController;