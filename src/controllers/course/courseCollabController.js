const { courseCollab } = require('../../database/models');


//Get all coruse collaborators
const getAllCollabs = async(req, res) => {
   try {
      const courseId = req.params
      collabs = await courseCollab.findAll({
         where:{
           courseId,
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
      courseId = req.params
      collabId = req.body
      if(checkNull({ courseId, collabId })) 
         return res.status(400).json({message:'Add collaborator failed, some fields are missing'})
      await courseCollab.create({courseId, collabId})
      res.status(200).json({ message: 'Add collaborator to course successfully' });     
   }catch(err){
      res.status(500).json({ error: error.message });     
   }
}
//delete
const deleteCourseCollab = async(req, res) => {
   try {
      const courseId = req.params
      const collabId = req.body
      deleted = await courseCollab.destroy({
        where:{
         courseId,
         collabId,
        },
      })
      if(!deleted) return res.status(404).json({ error: 'Collaborator not found' })
      res.status(200).json({ message: 'Deleted collaborator successful' })

   }catch (error) {
      res.status(500).json({ error: error.message })
   }s
}


module.exports = {addCourseCollab, deleteCourseCollab, getAllCollabs}