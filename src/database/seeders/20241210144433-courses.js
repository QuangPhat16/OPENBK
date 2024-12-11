'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Truy vấn để lấy id của người dùng có role 'COLLAB'
    const collabUser = await queryInterface.rawSelect('Users', {
      where: {
        role: 'COLLAB'
      }
    }, ['id']);

    console.log(collabUser)
    // Kiểm tra nếu có user với role 'COLLAB', gán vào authorId
    if (collabUser) {
      await queryInterface.bulkInsert('Courses', [
        {
          courseId: 1,
          courseName: 'Introduction to JavaScript',
          imageUrl: 'https://example.com/js-course.jpg',
          category: 'Programming',
          createDate: new Date('2024-01-01'),
          authorId: collabUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 2,
          courseName: 'Advanced Node.js',
          imageUrl: 'https://example.com/node-course.jpg',
          category: 'Programming',
          createDate: new Date('2024-02-01'),
          authorId: collabUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 3,
          courseName: 'Database Management with PostgreSQL',
          imageUrl: 'https://example.com/psql-course.jpg',
          category: 'Databases',
          createDate: new Date('2024-03-01'),
          authorId: collabUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log('No COLLAB user found');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
