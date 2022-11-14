'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Manpowers',[
      {
        mpName: "Adam",
        mpAge: "22",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Bryant",
        mpAge: "23",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Clement",
        mpAge: "24",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Dickson",
        mpAge: "25",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Edmund",
        mpAge: "26",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Fredrick",
        mpAge: "27",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "George",
        mpAge: "28",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Halix",
        mpAge: "29",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Jacky",
        mpAge: "30",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Kris",
        mpAge: "20",
        role: "1",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mpName: "Leonard",
        mpAge: "21",
        role: "2",
        gender: "1",
        operationStartDate: "2022-11-02",
        status: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Manpowers', null, {});
  }
};
