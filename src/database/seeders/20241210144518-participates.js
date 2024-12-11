'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "User";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const courses = await queryInterface.sequelize.query(
      'SELECT "courseID" FROM "Course";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    // Tạo dữ liệu mẫu cho bảng Participate
    const participateData = [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: users[0].id, // userID từ bảng Users
        courseID: courses[0].courseID, // courseID từ bảng Courses
        enrollmentDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: users[1].id,
        courseID: courses[1].courseID,
        enrollmentDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Thêm các bản ghi khác nếu cần
    ];

    await queryInterface.bulkInsert('Participates', participateData);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Participates', null, {});

  }
};
