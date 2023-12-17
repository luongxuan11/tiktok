"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Comment extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Comment.belongsTo(models.Overview, {
            foreignKey: "overview_id",
            targetKey: "id",
            as: "comments",
          });

          Comment.hasMany(models.Feedback, { foreignKey: "comment_id", as: "link_feedback" });
      }
   }
   Comment.init(
      {
         overview_id: DataTypes.STRING,
         comment: DataTypes.TEXT,
         userId: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Comment",
      },
   );
   return Comment;
};
