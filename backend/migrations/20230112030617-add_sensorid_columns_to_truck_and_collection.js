'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn(
        'Trucks',
        'sensorId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Sensors',
            key: 'id'
          }
        }
      ),
      await queryInterface.addColumn(
        'Collections',
        'sensorId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Sensors',
            key: 'id'
          }
        }
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('Trucks','sensorId'),
      await queryInterface.removeColumn('Collections','sensorId'),
    ])
  }
};
