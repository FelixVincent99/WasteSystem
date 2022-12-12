'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Area.belongsTo(models.Truck, {
        foreignKey: 'defaultTruckId'
      });
      Area.belongsTo(models.Manpower, {
        foreignKey: 'defaultDriverId'
      });
    }
  }
  Area.init({
    areaCode: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defaultTruckId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Trucks',
          key: 'id'
      }
    },
    defaultDriverId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Manpowers',
            key: 'id'
        }
    },
    defaultLoadersId: {
        type: DataTypes.STRING,
    },
    collectionFrequency: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};