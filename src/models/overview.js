'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Overview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Overview.init({
    user_id: DataTypes.STRING,
    title: DataTypes.TEXT,
    privacy: DataTypes.STRING,
    file_name: DataTypes.TEXT,
    file_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Overview',
  });
  return Overview;
};