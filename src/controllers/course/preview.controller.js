const { Preview } = require('../../database/models');

const PreviewController = {
    async createPreviewForID(req, res) {
        try {
            const { courseId } = req.params;
            if (isNaN(parseInt(courseId))) return res.status(400).json({ error: 'COURSE Id must be a number' });
            
            const {descriptionHeader, descriptionFull, objective} = req.body;
            const preview = await Preview.create({ descriptionFull, descriptionHeader, objective, courseId});
            res.status(201).json(preview);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
    },
  
    async getAllPreviews(req, res) {
        try {
            const { courseId } = req.params;
            if (isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
            const previews = await Preview.findAll(
            { where: { courseId } }
            );
            res.status(200).json(previews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getPreviewById(req, res) {
        try {
            const { courseId, id } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(id))) return res.status(400).json({ error: 'Id must be a number' });
            const preview = await Preview.findByPk(id, {
            where: { courseId },
            });
            if (!preview) return res.status(404).json({ error: 'Preview not found' });
            res.status(200).json(preview);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async updatePreview(req, res) {
        try {
            const { courseId, id } = req.params;
            if (isNaN(parseInt(id)) || isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
            const { previewName, numericalOrder } = req.body;
            const updated = await Preview.update(
            { previewName, numericalOrder },
            { where: { PreviewId: id } }
            );
            if (!updated[0]) return res.status(404).json({ error: 'Preview not found' });
            res.status(200).json({ message: 'Preview updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async deletePreview(req, res) {
        try {
            const { courseId, id } = req.params;
            if (isNaN(parseInt(id)) || isNaN(parseInt(courseId))) return res.status(400).json({ error: 'Id must be a number' });
            const deleted = await Preview.destroy({ where: { PreviewId: id } });
            if (!deleted) return res.status(404).json({ error: 'Preview not found' });
            res.status(200).json({ message: 'Preview deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = PreviewController;