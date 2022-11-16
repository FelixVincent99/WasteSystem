'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bincollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bincollection.init({
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Collections',
          key: 'id'
      }
    },
    binId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Bins',
            key: 'id'
        }
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    }    
  }, {
    sequelize,
    modelName: 'Bincollection',
  });
  return Bincollection;
};