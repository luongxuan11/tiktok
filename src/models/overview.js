"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Overview extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Overview.hasMany(models.Comment, { foreignKey: "overview_id", as: "comments" });
         Overview.hasMany(models.Status, { foreignKey: "overview_id", as: "status" });
         Overview.hasMany(models.Share, { foreignKey: "overview_id", as: "share" });
         Overview.belongsTo(models.User, {
            foreignKey: "user_id",
            targetKey: "id",
            as: "user",
         });
      }
   }
   Overview.init(
      {
         user_id: DataTypes.STRING,
         title: DataTypes.TEXT,
         privacy: DataTypes.STRING,
         video_file_name: DataTypes.TEXT,
         video_file_id: DataTypes.STRING,
         thumb_file_name: DataTypes.STRING,
         thumb_file_id: DataTypes.STRING,
         comment_status: DataTypes.BOOLEAN,
         tag: DataTypes.STRING,
         api_key: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Overview",
      },
   );
   return Overview;
};
