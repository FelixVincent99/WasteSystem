'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Route.init({
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'schedules',
          key: 'id'
      }
    },
    stopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'stops',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};