const { Participate, Course } = require('../../database/models');

const courseEnroll = {
   async getEnrolledCourses (req, res) {
      try {
         const { learnerID } = req.params;
         console.log(learnerID)
         const enrolledCourses = await Participate.findAll({
            where: {
               learnerID,
            },
            include: [
            { model: Course, as: 'courseLearned', attributes: ['courseName'] },
            ],
         });

         if (enrolledCourses.length === 0) {
            return res.status(404).json({ error: 'No enrolled courses founded' });
         }

         return res.status(200).json( enrolledCourses );
      } catch (err) {
         console.error(err);
         return res.status(500).json({ error: err.message });
      }
   },
   async enrollCourse (req, res) {
      try {
         const { learnerID, courseID } = req.body;
         console.log(learnerID, courseID)
         const existingEnrollment = await Participate.findOne({
            where: {
               learnerID,
               courseID,
            },
         });

         if (existingEnrollment) {
            return res.status(400).json({ error: 'User is already enrolled in this course' });
         }

         await Participate.create({
            learnerID,
            courseID,
         });

         return res.status(201).json({ message: 'Enrolled in course successfully' });
      } catch (err) {
         console.error(err);
         return res.status(500).json({ error: err.message });
      }
   },
   async deleteEnrolledCoures (req, res) {
      try {
         const { learnerID, courseID } = req.params;

         if (!learnerID) {
            return res.status(400).json({ message: 'Learner ID is missing' });
         }

         const deleted = await Participate.destroy({
            where: {
               learnerID,
               courseID,
            },
         });

         if (!deleted) {
            return res.status(404).json({ error: 'Learner not found in this course' });
         }

         return res.status(200).json({ message: 'Deleted learner from course successfully' });
      } catch (err) {
         console.error(err);
         return res.status(500).json({ error: err.message });
      }
   },
}
module.exports = courseEnroll
