const express = require('express')
const { Comment } = require('../../database/models');

//CREATE
const createCourse = async (req, res) => {
  try {
    const { text, userId, parentId } = req.body;
    const course = await Course.create({ text, userId, parentId });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Course, as: 'replies' }]
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const course = await Course.findByPk(id);
    if (course) {
      course.text = text;
      await course.save();
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//DELETE
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Comment.findByPk(id);
    if (course) {
      await course.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
};