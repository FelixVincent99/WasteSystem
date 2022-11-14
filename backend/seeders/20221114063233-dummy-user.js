'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: "admin",
        email: "admin@mail.com",
        password: "$2a$10$0jpuTlqsZ58N2.Vt2wwMV.4ONX15Zxmys76GTke6/joULAdIG0ZL6", //abc123
        role: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "manager",
        email: "manager@mail.com",
        password: "$2a$10$0jpuTlqsZ58N2.Vt2wwMV.4ONX15Zxmys76GTke6/joULAdIG0ZL6", //abc123
        role: "2",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {      
        name: "supervisor",
        email: "supervisor@mail.com",
        password: "$2a$10$0jpuTlqsZ58N2.Vt2wwMV.4ONX15Zxmys76GTke6/joULAdIG0ZL6", //abc123
        role: "3",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
