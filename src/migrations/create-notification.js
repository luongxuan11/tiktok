"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Notifications", {
         id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
         },
         user_id: {
            type: Sequelize.STRING,
         },
         overviewId: {
            type: Sequelize.STRING,
         },
         type: {
            type: Sequelize.STRING,
         },
         mess: {
            type: Sequelize.TEXT,
         },
         thumbFile: {
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
         },
         updatedAt: {
            allowNull: false,
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Notifications");
   },
};