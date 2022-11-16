'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.Area, {
        foreignKey: 'areaId'
      });
      Schedule.belongsTo(models.Truck, {
        foreignKey: 'truckId'
      });
      Schedule.belongsTo(models.Manpower, {
        foreignKey: 'DriverId'
      });
    }
  }
  Schedule.init({
    scheduleDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    scheduleTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    startDateTime: {
        type: DataTypes.DATE,            
    },
    endDateTime: {
        type: DataTypes.DATE,
    },
    areaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'areas',
            key: 'id'
        }
    },
    truckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'trucks',
            key: 'id'
        }
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'manpowers',
            key: 'id'
        }
    },
    loaderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weightFromSensor: {
        type: DataTypes.FLOAT
    },
    actualWeight: {
        type: DataTypes.FLOAT
    },
    fuelConsumption: {
        type: DataTypes.FLOAT
    },
    totalMilage: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};