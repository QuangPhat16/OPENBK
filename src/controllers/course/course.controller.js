const { Course } = require('../../database/models');

const CourseController = {
  async createCourse(req, res) {
    try {
      const { courseName, description } = req.body;
      const course = await Course.create({ courseName, description });
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll({
        include: [{ model: Unit, as: 'units' }], 
      });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: [{ model: Unit, as: 'units' }],
      });
      if (!course) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { courseName, description } = req.body;
      const updated = await Course.update(
        { courseName, description },
        { where: { courseId: id } }
      );
      if (!updated[0]) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Course.destroy({ where: { courseId: id } });
      if (!deleted) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CourseController;