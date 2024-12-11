const { Comment } = require('../../../database/models');

const createComment = async (req, res) => {
  try {
    const { text, userId, parentId } = req.body;
    const comment = await Comment.create({ text, userId, parentId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment
};
