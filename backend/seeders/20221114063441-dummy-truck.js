'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    return queryInterface.bulkInsert('Trucks', [
      {
        truckNo: "QAB123",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QBC456",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QCD789",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QEF246",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QGH357",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Trucks', null, {});
  }
};
