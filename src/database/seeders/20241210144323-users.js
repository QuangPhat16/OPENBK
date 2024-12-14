'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    await queryInterface.bulkInsert('User', [
      {
        // id: Sequelize.literal('uuid_generate_v4()'), // Tạo UUID cho id
        // firstName: 'John',
        // lastName: 'Doe',
        userID: "dnafnaksdfbak",
        name: "John Doe",
        email: 'john.doe@example.com',
        role: 'USER',
        password: 'hashedPassword123', // Đảm bảo mã hóa mật khẩu trước khi lưu vào db
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: Sequelize.literal('uuid_generate_v4()'),
        // firstName: 'Jane',
        // lastName: 'Smith',
        userID: "adnsfjknasfjansf",
        name: "Jane Smith",
        email: 'jane.smith@example.com',
        role: 'COLLAB',
        password: 'hashedPassword456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: Sequelize.literal('uuid_generate_v4()'),
        // firstName: 'Admin',
        // lastName: 'User',
        userID: "adfghtyhrtbvdfvsd",
        name: "Admin User",
        email: 'admin.user@example.com',
        role: 'ADMIN',
        password: 'hashedPassword789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
