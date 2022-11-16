'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Manpowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mpName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mpAge: {
          type: Sequelize.INTEGER
      },
      role: {
          type: Sequelize.INTEGER
      },
      gender: {
          type: Sequelize.INTEGER
      },
      operationStartDate: {
          type: Sequelize.DATE
      },
      operationEndDate: {
          type: Sequelize.DATE
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
    await queryInterface.dropTable('Manpowers');
  }
};