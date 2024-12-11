const { Course, User } = require('../../database/models');
const {filterNull, checkNull} = require('../../common/ultis');
const { generateCourseID } = require('../../utils/generateID');

const CourseController = {
  async createCourse (req, res) {
    try {
      const { authorID, courseName, imageUrl, category, description, price } = req.body;
      if(checkNull({ authorID, courseName, imageUrl, category, description, price })) return res.status(400).json({message:'Course creation failed, some fields are missing'})
      const userID = authorID
      console.log(userID)
      const author = await User.findOne({ where: { userID } });
      if(!author) return res.status(404).json({message:'author not found'})
      await Course.create({ courseID: generateCourseID(), authorID, courseName, description, price });
      return res.status(201).json({message:'Course creation is successful'});
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

  async updateCourse(req, res){
    try {
      const { courseID }  = req.params;
      const { description, price, courseName} = req.body;
      const params = filterNull({ description, price, courseName})

      const updated = await Course.update(params, {where:{
        courseID,
      }})

      if(!updated) return res.status(404).json({ error: 'Course not found' });

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