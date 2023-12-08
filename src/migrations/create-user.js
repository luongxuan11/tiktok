'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      tiktok_id: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.TEXT
      },
      role_code: {
        type: Sequelize.STRING,
        defaultValue: 'R3'
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.INTEGER
      },
      verifyOTP:{
          type: Sequelize.BOOLEAN,
          defaultValue: false, 
      },
      passwordResetToken: {
        type: Sequelize.TEXT
      },
      passwordResetExpires: {
        type: Sequelize.TEXT
      },
      fileName: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};