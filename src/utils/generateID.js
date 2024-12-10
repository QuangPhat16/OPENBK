const generateUserID = () => {
  const randomID = Math.floor(100000 + Math.random() * 900000);
  return `UR${randomID}`;
};

const generateCourseID = () => {
  const randomID = Math.floor(100000 + Math.random() * 900000); 
  return `CO${randomID}`;
};

module.exports = {
  generateUserID,
  generateCourseID
};
