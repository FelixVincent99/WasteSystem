'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bin.init({
    stopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'stops',
          key: 'id'
      }
    },
    binType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    binCapacity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bin',
  });
  return Bin;
};