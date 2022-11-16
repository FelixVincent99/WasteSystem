'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bincollections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Collections',
            key: 'id'
        }
      },
      binId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Bins',
              key: 'id'
          }
      },
      weight: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      lat: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lng: {
          type: Sequelize.STRING,
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
    await queryInterface.dropTable('Bincollections');
  }
};