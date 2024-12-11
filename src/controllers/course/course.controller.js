const { Course, User } = require('../../database/models');


const CourseController = {
  async createCourse(req, res) {
    try {
      const id = req.user.id;
      const { courseId, courseName, imageUrl, user, category } = req.body;
      const course = await Course.create({ courseId, courseName, imageUrl, user, category, authorId: id });
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllCourses(req, res) {
    try {
      const response = await Course.findAll({
        include: {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'name']
        }
      })
      res.json(response)
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async getCourseById(req, res) {
    try {
      console.log(req)
      const { id } = req.params;
      if (isNaN(parseInt(id))) return res.status(400).json({ error: 'Id must be a number' });
      const course = await Course.findByPk(id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(parseInt(id))) return res.status(400).json({ error: 'Id must be a number' });
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
      if (isNaN(parseInt(id))) return res.status(400).json({ error: 'Id must be a number' });
      const deleted = await Course.destroy({ where: { courseId: id } });
      if (!deleted) return res.status(404).json({ error: 'Course not found' });
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteAllCourses(req, res) {
    try {
      const deleted = await Course.destroy({ where: {} });
      if (!deleted) return res.status(404).json({ error: 'No courses found to delete' });
      res.status(200).json({ message: 'All courses deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CourseController;