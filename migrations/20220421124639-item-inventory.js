'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'tags'),
      queryInterface.addColumn(
        'Users',
        'inventory',
        {
          type: Sequelize.JSON,
          allowNull: false,
					defaultValue: [{}]
        }
      ),
      queryInterface.createTable('Items', { id: Sequelize.INTEGER })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'tags', { type: Sequelize.JSON }),
      queryInterface.removeColumn('Users', 'inventory'),
      queryInterface.dropTable('Items')
    ]);
  }
};

/*
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     
  }
};
*/