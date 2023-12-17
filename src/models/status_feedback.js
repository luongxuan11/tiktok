'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status_feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Status_feedback.init({
    detail_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status_feedback',
  });
  return Status_feedback;
};