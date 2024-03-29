'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stop.init({
    stopName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stopOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    areaCode: {
        type: DataTypes.TEXT,
    },
    lat: {
        type: DataTypes.FLOAT
    },
    long: {
        type: DataTypes.FLOAT
    },
    binAmount: {
        type: DataTypes.INTEGER
    },
    averageWeight: {
        type: DataTypes.FLOAT
    },
    averageFuelConsumption: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stop',
  });
  return Stop;
};