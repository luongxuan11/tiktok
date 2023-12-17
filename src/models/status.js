'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.belongsTo(models.Overview, {
        foreignKey: "overview_id",
        targetKey: "id",
        as: "status",
      });
    }
  }
  Status.init({
    overview_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};