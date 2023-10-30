"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Follows", {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      follower_id: {
        type: Sequelize.STRING,
      },
      notification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status_follow: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      expired: {
        type: Sequelize.STRING,
      },
      require_follower: {
        type: Sequelize.STRING,
      },
      following_id: {
        type: Sequelize.STRING,
      },
      require_following: {
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
    await queryInterface.dropTable("Follows");
  },
};
