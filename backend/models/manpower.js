'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manpower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manpower.init({
    mpName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mpAge: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.INTEGER
    },
    operationStartDate: {
        type: DataTypes.DATE
    },
    operationEndDate: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Manpower',
  });
  return Manpower;
};