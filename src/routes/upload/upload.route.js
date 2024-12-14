
const { uploadProfile, uploadCourse } = require('../../middleware/uploadImg');
const { uploadProfileImage, uploadCourseThumbnail } = require('../../controllers/upload/upload.controller');
const verifyJWT = require('../../middleware/verifyJWT');
const express = require('express');
const router = express.Router();


// router.use(verifyJWT)
// API upload ảnh profile
router.post('/profile', uploadProfile.single('image'), uploadProfileImage);
router.post('/course', uploadCourse.single('image'), uploadCourseThumbnail);

module.exports = router
