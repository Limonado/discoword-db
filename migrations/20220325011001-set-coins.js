'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'coins',
        {
          type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 0
        }
      ),
      queryInterface.addColumn(
        'Users',
        'tags',
        {
          type: Sequelize.JSON
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'coins'),
      queryInterface.removeColumn('Users', 'tags')
    ]);
  }
};
