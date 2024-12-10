const checkCollabPrivilige = async(req, res, next) => {
   try {
      courseId = req.params
      collabId = req.user.id
      collab = await courseCollab.findOne({
         where:{
          courseId,
          collabId,
         },
      })
      if(!collab) return res.status(401).json({message: 'Unauthorized'})
      next()
   }catch(err){
      res.status(500).json({ message: 'Failed to access course resourse'});      
   }
}

module.exports = checkCollabPrivilige