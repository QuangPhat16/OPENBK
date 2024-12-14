const { User } = require('../../database/models')

const uploadProfileImage = async (req, res) => {
  const userID = req?.user?.id || "adnsfjknasfjansf"
  try {
    const updateUser = await User.findByPk(userID)
    if (!updateUser) return res.status(404).json({ message: 'Updated fail, no user found' })

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const filePath = `${baseUrl}/uploads/profile/${req.file.filename}`;
    await User.update({ profileUrl: filePath }, { where: { userID } })


    return res.json({ message: 'Update user information successfully' })
  } catch (err) {
    console.error(`${err}`);
    return res.status(500).json({ error: err.message })
  }
};

const uploadCourseThumbnail = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const id = api
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const filePath = `${baseUrl}/uploads/course/${req.file.filename}`;
  res.json({
    message: 'Course thumbnail uploaded successfully.',
    filePath: filePath, // Trả về đường dẫn của ảnh thumbnail
  });
};

module.exports = {
  uploadCourseThumbnail,
  uploadProfileImage
}