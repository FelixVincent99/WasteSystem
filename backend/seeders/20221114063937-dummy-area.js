'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Areas',[
      {
        areaCode: "MHH1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "MHH2",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "MHH3",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "DHH1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "DHH2",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "DHH3",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "MPP1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "MPP2",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        areaCode: "MPP3",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Areas', null, {});
  }
};
