'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
			
			discordId: { type: Sequelize.STRING, allowNull: false },
			name: { type: Sequelize.STRING, allowNull: false },
			totalScore: { type: Sequelize.INTEGER, defaultValue: 0 },
			score: { type: Sequelize.JSON },
			
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};