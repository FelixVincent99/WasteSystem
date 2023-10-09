'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('Stops','areaId'),
      await queryInterface.addColumn(
        'Stops',
        'areaCode',
        {
          type: Sequelize.TEXT
        }
      ),
      await queryInterface.addColumn(
        'Areas',
        'areaColor',
        {
          type: Sequelize.STRING
        }
      ),
      await queryInterface.addColumn(
        'Stops',
        'stopOrder',
        {
          type: Sequelize.INTEGER
        }
      ),
      await queryInterface.addColumn(
        'Stops',
        'lat',
        {
          type: Sequelize.FLOAT
        }
      ),
      await queryInterface.addColumn(
        'Stops',
        'long',
        {
          type: Sequelize.FLOAT
        }
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('Stops','areaCode'),
      await queryInterface.removeColumn('Areas','areaColor'),
      await queryInterface.removeColumn('Stops','stopOrder'),
      await queryInterface.removeColumn('Stops','lat'),
      await queryInterface.removeColumn('Stops','long'),
    ])
  }
};
