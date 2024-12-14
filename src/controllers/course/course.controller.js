const { Course, User } = require('../../database/models');
const {filterNull, checkNull} = require('../../common/ultis');
const { generateCourseID } = require('../../utils/generateID');

const CourseController = {
  async createCourse(req, res) {
    try {
      const { authorID, courseName, imageUrl, category, description, price } = req.body;
      if (checkNull({ authorID, courseName, imageUrl, category, description, price })) {
        return res.status(400).json({ message: 'Course creation failed, some fields are missing' });
      }

      const author = await User.findOne({ where: { userID: authorID } });
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }

      if (author.role !== 'COLLAB') {
        return res.status(403).json({ message: 'You do not have permission to create a course, role must be COLLAB' });
      }

      await Course.create({
        courseID: generateCourseID(),
        authorID,
        courseName,
        description,
        price
      });

      return res.status(201).json({ message: 'Course creation is successful' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



  async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll({
          // include: {
          //   model: User,
          //   as: 'author',
          //   attributes: ['name']
          // }
        });
      if(!courses) return res.status(404).json({message:'No course is found'}) 
      res.status(200).json( courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCourseById(req, res) {
    try {
      const { courseID } = req.params
      const courses = await Course.findOne({where: { courseID } });
      if(!courses) return res.status(404).json({message:'No course is found'}) 
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCourse(req, res) {
    try {
      const courseId = req.params.courseID;
      const {
        description: newDescription,
        price: newPrice,
        courseName: newCourseName,
        authorId: newAuthorId,
      } = req.body;

      const fieldsToUpdate = filterNull({
        description: newDescription,
        price: newPrice,
        courseName: newCourseName,
      });

      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const author = await User.findByPk(newAuthorId);
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }

      if (author.role !== 'COLLAB') {
        return res.status(403).json({ error: 'You do not have permission to update this course, role must be COLLAB' });
      }
      if (course.authorId !== newAuthorId) {
        return res.status(403).json({ error: 'You are not the author of this course and cannot update it' });
      }

      const [updatedRowsCount] = await Course.update(fieldsToUpdate, {
        where: { courseID: courseId },
      });
      if (updatedRowsCount === 0) {
        return res.status(400).json({ error: 'No changes were made' });
      }

      res.status(200).json({ message: 'Updated course successfully' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  //DELETE
  async deleteCourse (req, res) {
    try {
      const { courseID }  = req.params;
      console.log(courseID);
      deleted = await Course.destroy({
        where:{
          courseID,
        },
      })

      if(!deleted) return res.status(404).json({ error: 'Course not found' });

      res.status(200).json({ message: 'Deleted course successfully' });
    }catch (error) {
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



module.exports = CourseController