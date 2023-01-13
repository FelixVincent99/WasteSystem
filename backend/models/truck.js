'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Truck.init({
    truckNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operationStartDate: {
        type: DataTypes.DATE
    },
    operationEndDate: {
        type: DataTypes.DATE
    },
    truckType: {
        type: DataTypes.INTEGER
    },
    averageFuelConsumption: {
        type: DataTypes.FLOAT
    },
    milage: {
        type: DataTypes.FLOAT
    },
    sensorId: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Truck',
  });
  return Truck;
};