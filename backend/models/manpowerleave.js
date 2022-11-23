'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManpowerLeave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ManpowerLeave.belongsTo(models.Manpower,{
        foreignKey: 'manpowerId'
      });
    }
  }
  ManpowerLeave.init({
    manpowerId: DataTypes.INTEGER,
    leaveStartDate: DataTypes.DATE,
    leaveEndDate: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ManpowerLeave',
  });
  return ManpowerLeave;
};