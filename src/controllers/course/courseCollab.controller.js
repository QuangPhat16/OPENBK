const { courseCollab } = require('../../database/models');


//Get all coruse collaborators
const getAllCollabs = async(req, res) => {
   try {
      const { courseID } = req.params
      collabs = await courseCollab.findAll({
         where:{
           courseID,
         },
      })
      if(!collab.length) return res.status(404).json({ error: 'No collaborator is found' }) 
      return res.status(200).json({collabs})
   }catch(err){
      res.status(500).json({ error: error.message });      
   }
}
//add collaborator to course
const addCourseCollab = async(req, res) => {
   try{
      const {courseID, collabID} = req.body
      if(checkNull({ courseID, collabID })) 
         return res.status(400).json({message:'Add collaborator failed, some fields are missing'})
      const course = await Course.findByPk(courseID)
      const user = await User.findByPk(collabID)
      if(!course || !user) return res.status(404).json({ error: 'Course or user not found' })
      await courseCollab.create({courseID, collabID})
      res.status(200).json({ message: 'Add collaborator to course successfully' });     
   }catch(err){
      res.status(500).json({ error: error.message });     
   }
}
//delete
const deleteCourseCollab = async(req, res) => {
   try {
      const { courseID } = req.params
      const collabID = req.body
      deleted = await courseCollab.destroy({
        where:{
         courseID,
         collabID,
        },
      })
      if(!deleted) return res.status(404).json({ error: 'Collaborator not found' })
      res.status(200).json({ message: 'Deleted collaborator successful' })

   }catch (error) {
      res.status(500).json({ error: error.message })
   }s
}


module.exports = {addCourseCollab, deleteCourseCollab, getAllCollabs}