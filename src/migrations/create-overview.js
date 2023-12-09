'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Overviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.TEXT,
      },
      privacy: {
        type: Sequelize.STRING
      },
      video_file_name: {
        type: Sequelize.TEXT
      },
      video_file_id: {
        type: Sequelize.STRING
      },
      thumb_file_id: {
        type: Sequelize.STRING
      },
      thumb_file_name: {
        type: Sequelize.STRING
      },
      comment_status: {
        type: Sequelize.BOOLEAN
      },
      tag: {
        type: Sequelize.STRING
      },
      api_key: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Overviews');
  }
};