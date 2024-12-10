const { Comment } = require('../../database/models');
// const { param } = require('../../routes/auth.route');

const createComment = async (req, res) => {
  try {
    const { text, userId, parentId } = req.body;
    await Comment.create({ text, userId, parentId });
    res.status(201).json({message: 'Create comment successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all parent comments
const getComments = async (req, res) => {
  try {
    courseId = req.params 
    const comments = await Comment.findAll({
      where: {
        courseId,
        parentId: null}
    });
    res.status(200).json({'comments': comments});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get children comments
const getSubComments = async (req, res) => {
  try {
    const courseId = req.params 
    const parentId = rq.body
    const comments = await Comment.findAll({
      where: {
        courseId,
        parentId
      }
    });
    res.status(200).json({'comments': comments});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const {commentId, text} = req.body;
    const comment = await Comment.findByPk(id);
    if(comment.userId !== userId) return res.status(401).json({message:'Unauthorized'})
    updated = await Comment.update(
      {text},
      {where: {commentId}},
    )
    if(!updated) return res.status(404).json({message: 'Comment not found'})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    deleted = await Comment.destroy({
      where:{ commentId },
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  getSubComments,
  deleteComment,
  updateComment
};
