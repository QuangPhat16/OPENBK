const express = require('express')
const router = express.Router()
const { Comment } = require('../models');

//CREATE
const createComment = async (req, res) => {
  try {
    const { text, userId, parentId } = req.body;
    const comment = await Comment.create({ text, userId, parentId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post('/comments', async (req, res) => {
    try {
      await commentController.createComment(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

//READ
const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: Comment, as: 'replies' }]
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
router.get('/comments', async (req, res) => {
    try {
      await commentController.getComments(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
 
//UPDATE
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.text = text;
      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
router.put('/comments/:id', async (req, res) => {
    try {
      await commentController.updateComment(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

//DELETE
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
router.delete('/comments/:id', async (req, res) => {
    try {
      await commentController.deleteComment(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment
};