'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const courses = await queryInterface.sequelize.query(
      'SELECT "courseId" FROM "Courses";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    // Tạo dữ liệu mẫu cho bảng Participate
    const participateData = [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userId: users[0].id, // userId từ bảng Users
        courseId: courses[0].courseId, // courseId từ bảng Courses
        enrollmentDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userId: users[1].id,
        courseId: courses[1].courseId,
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
