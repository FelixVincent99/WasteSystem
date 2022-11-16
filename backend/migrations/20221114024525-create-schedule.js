'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scheduleDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      scheduleTime: {
          type: Sequelize.TIME,
          allowNull: false
      },
      startDateTime: {
          type: Sequelize.DATE,            
      },
      endDateTime: {
          type: Sequelize.DATE,
      },
      areaId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'areas',
              key: 'id'
          }
      },
      truckId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'trucks',
              key: 'id'
          }
      },
      driverId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'manpowers',
              key: 'id'
          }
      },
      loaderId: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      weightFromSensor: {
          type: Sequelize.FLOAT
      },
      actualWeight: {
          type: Sequelize.FLOAT
      },
      fuelConsumption: {
          type: Sequelize.FLOAT
      },
      totalMilage: {
          type: Sequelize.FLOAT
      },
      status: {
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
    await queryInterface.dropTable('Schedules');
  }
};