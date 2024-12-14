'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Truy vấn để lấy id của người dùng có role 'COLLAB'
    const collabUser = await queryInterface.rawSelect('User', {
      where: {
        role: 'COLLAB'
      }
    }, ['userID']);

    console.log(collabUser)
    // Kiểm tra nếu có user với role 'COLLAB', gán vào authorID
    if (collabUser) {
      await queryInterface.bulkInsert('Course', [
        {
          courseID: "dnjkegnrtgnjk",
          courseName: 'Introduction to JavaScript',
          imageUrl: 'https://example.com/js-course.jpg',
          category: 'Programming',
          // createDate: new Date('2024-01-01'),
          authorID: collabUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseID: "dfggdsgkopyjieov",
          courseName: 'Advanced Node.js',
          imageUrl: 'https://example.com/node-course.jpg',
          category: 'Programming',
          // createDate: new Date('2024-02-01'),
          authorID: collabUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseID: "nfioegobfnjksbf",
          courseName: 'Database Management with PostgreSQL',
          imageUrl: 'https://example.com/psql-course.jpg',
          category: 'Databases',
          // createDate: new Date('2024-03-01'),
          authorID: collabUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log('No COLLAB user found');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Course', null, {});
  }
};
