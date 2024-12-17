const generateLearnerID = () => {
  const randomID = Math.floor(100000 + Math.random() * 900000);
  return `LEA${randomID}`;
};
const generateCollabID = () => {
  const randomID = Math.floor(100000 + Math.random() * 900000);
  return `COL${randomID}`;
};

const generateCourseID = () => {
  const randomID = Math.floor(100000 + Math.random() * 900000); 
  return `COU${randomID}`;
};

module.exports = {
  generateLearnerID,
  generateCollabID,
  generateCourseID
};
