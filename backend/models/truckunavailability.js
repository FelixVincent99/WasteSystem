'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TruckUnavailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TruckUnavailability.belongsTo(models.Truck,{
        foreignKey: 'truckId'
      });
    }
  }
  TruckUnavailability.init({
    truckId: DataTypes.INTEGER,
    unavailabilityStartDate: DataTypes.DATE,
    unavailabilityEndDate: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TruckUnavailability',
  });
  return TruckUnavailability;
};