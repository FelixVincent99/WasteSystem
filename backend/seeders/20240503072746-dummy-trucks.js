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
      {
        truckNo: "QAB1234",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QBC4567",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QCD7890",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QEF2465",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QGH3576",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QAB1235",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QBC4568",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QCD7891",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QEF2466",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QGH3577",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QAB1231",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QBC4564",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QCD7897",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QEF2462",
        operationStartDate: "2022-11-02",
        truckType: "1",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        truckNo: "QGH3573",
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
