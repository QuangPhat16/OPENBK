const express = require('express');
const router = express.Router();
const {createComment, getComments, getSubComments, deleteComment, updateComment} = require('../../../controllers/comment/comment.controller');

router.post('/', async (req, res) => {
  try {
    await createComment(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await getComments(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await getSubComments(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    await updateComment(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    await deleteComment(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
