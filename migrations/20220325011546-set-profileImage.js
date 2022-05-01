'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'profileImage',
        {
          type: Sequelize.STRING,
					allowNull: false,
					defaultValue: "default"
        }
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'profileImage')
    ]);
  }
};
