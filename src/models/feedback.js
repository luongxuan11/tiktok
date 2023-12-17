"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Feedback extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Feedback.belongsTo(models.Comment, {
            foreignKey: "comment_id",
            targetKey: "id",
            as: "link_feedback",
          });
      }
   }
   Feedback.init(
      {
         comment_id: DataTypes.STRING,
         feedback: DataTypes.TEXT,
         userId: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Feedback",
      },
   );
   return Feedback;
};
