const { Participate, User, Course } = require('../../database/models');

const CourseCollab = {
   async getAllLearners (req, res) {
      try {
         const { courseID } = req.params;

         const learners = await Participate.findAll({
            where: {
               courseID,
            },
            include: [
               { model: User, as: 'learner', attributes: ['userID', 'name', 'email'] },
            ],
         });

         if (learners.length === 0) {
            return res.status(404).json({ error: 'No learners found for this course' });
         }

         return res.status(200).json({ learners });
      } catch (err) {
         console.error(err);
         return res.status(500).json({ error: err.message });
      }
   },
   async deleteLearnerFromCourse (req, res) {
      try {
         const { authorID, courseID , learnerID} = req.params;

         if (!learnerID) {
            return res.status(400).json({ message: 'Collab ID is missing' });
         }

         const deleted = await Participate.destroy({
            where: {
               authorID,
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
module.exports = CourseCollab
