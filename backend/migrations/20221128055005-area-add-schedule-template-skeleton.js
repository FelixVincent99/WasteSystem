'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn(
        'Areas',
        'defaultTruckId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Trucks',
            key: 'id'
          }
        }
      ),
      await queryInterface.addColumn(
        'Areas',
        'defaultDriverId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Manpowers',
            key: 'id'
          }
        }
      ),
      await queryInterface.addColumn('Areas','defaultLoadersId', {type: Sequelize.STRING}),
      await queryInterface.addColumn('Areas','collectionFrequency', {type: Sequelize.STRING}),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('Areas','defaultTruckId'),
      await queryInterface.removeColumn('Areas','defaultDriverId'),
      await queryInterface.removeColumn('Areas','defaultLoadersId'),
      await queryInterface.removeColumn('Areas','collectionFrequency'),
    ])
  }
};
