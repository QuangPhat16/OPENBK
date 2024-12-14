const multer = require('multer');
const path = require('path');

// Cấu hình Multer để lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tạo thư mục riêng cho profile và course
    if (req.route.path.includes('profile')) {
      cb(null, 'uploads/profile/');
    } else if (req.route.path.includes('course')) {
      cb(null, 'uploads/course/');
    } else {
      cb(new Error('Invalid file destination'), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Lấy phần mở rộng của file
    if (req.route.path.includes('profile')) {
      // Sử dụng username từ req.body để đặt tên file
      const userID = req?.user?.id || 'default'; // "default" nếu userID không được cung cấp
      cb(null, `${userID}${ext}`);
    } else {
      // Tạo tên file duy nhất cho các file khác
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + ext);
    }
  }
});

// Tạo middleware upload
const uploadProfile = multer({ storage: storage });
const uploadCourse = multer({ storage: storage });

module.exports = { uploadProfile, uploadCourse };
