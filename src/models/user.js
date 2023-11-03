'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {foreignKey: 'role_code', targetKey: 'code', as: 'roleData' }),
      User.hasMany(models.Overview, {foreignKey: 'user_id', as: 'user'})
    }
  }
  User.init({
    userName: DataTypes.STRING,
    tiktok_id: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    role_code: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    verifyOTP: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    passwordResetToken: DataTypes.TEXT,
    passwordResetExpires: DataTypes.TEXT,
    fileName: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};