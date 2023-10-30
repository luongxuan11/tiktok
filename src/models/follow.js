'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Follow.init({
    follower_id: DataTypes.STRING,
    notification:  {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
    status_follow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
    expired: DataTypes.STRING,
    require_follower: DataTypes.STRING,
    following_id: DataTypes.STRING,
    require_following: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};