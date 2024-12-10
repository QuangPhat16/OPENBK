const { Course, User } = require('../../database/models');
const {filterNull, checkNull} = require('../../common/ultis');
const { generateCourseID } = require('../../utils/generateID');


const createCourse = async (req, res) => {
  try {
    const { ownerID, courseName, description, price } = req.body;
    if(checkNull({ ownerID, courseName, description, price })) return res.status(400).json({message:'Course creation failed, some fields are missing'})
    const userID = ownerID
    const owner = await User.findOne({ where: { userID } });
    if(!owner) return res.status(404).json({message:'Owner not found'})
    await Course.create({ courseID: generateCourseID(), ownerID, courseName, description, price });
    return res.status(201).json({message:'Course creation is successful'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    if(!courses) return res.status(404).json({message:'No course is found'}) 
    res.status(200).json( courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const { courseID } = req.params
    const courses = await Course.findOne({where: { courseID } });
    if(!courses) return res.status(404).json({message:'No course is found'}) 
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
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
};

//DELETE
const deleteCourse = async (req, res) => {
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
};


module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse
};