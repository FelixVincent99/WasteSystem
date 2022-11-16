'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stopName: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      areaId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Areas',
              key: 'id'
          }
      },
      binAmount: {
          type: Sequelize.INTEGER
      },
      averageWeight: {
          type: Sequelize.FLOAT
      },
      averageFuelConsumption: {
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
    await queryInterface.dropTable('Stops');
  }
};