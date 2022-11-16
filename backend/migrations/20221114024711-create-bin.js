'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'stops',
            key: 'id'
        }
      },
      binType: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      binCapacity: {
          type: Sequelize.FLOAT,
          allowNull: false
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
    await queryInterface.dropTable('Bins');
  }
};