const { Course } = require('../../database/models');
const {filterNull, checkNull} = require('../../common/ultis');


const createCourse = async (req, res) => {
  try {
    const { text, userId, parentId } = req.body;
    if(checkNull({ text, userId, parentId })) return res.status(400).json({message:'Course creation failed, some fields are missing'})
    await Course.create({ text, userId, parentId });
    return res.status(201).json({message:'Course creation is successful'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    if(!courses.length) return res.status(404).json({message:'No course is found'}) 
    res.status(200).json({courses: courses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const courseId = req.params
    const courses = await Course.findByPk(courseId);
    if(!courses.length) return res.status(404).json({message:'No course is found'}) 
    res.status(200).json({courses: courses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId  = req.params;
    const { description, price, courseName} = req.body;
    const params = filterNull({ description, price, courseName})

    const updated = await Course.update(params, {where:{
      courseId,
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
    const  courseId  = req.params;
    deleted = await Course.destroy({
      where:{
        courseId,
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