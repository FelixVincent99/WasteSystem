'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trucks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      truckNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      operationStartDate: {
          type: Sequelize.DATE
      },
      operationEndDate: {
          type: Sequelize.DATE
      },
      truckType: {
          type: Sequelize.INTEGER
      },
      averageFuelConsumption: {
          type: Sequelize.FLOAT
      },
      milage: {
          type: Sequelize.FLOAT
      },
      status: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trucks');
  }
};