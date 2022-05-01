'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'experience',
        {
          type: Sequelize.INTEGER,
					defaultValue: 0
        }
      ),
      queryInterface.addColumn(
        'Users',
        'level',
        {
          type: Sequelize.INTEGER,
					defaultValue: 0
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'experience'),
      queryInterface.removeColumn('Users', 'level')
    ]);
  }
};
