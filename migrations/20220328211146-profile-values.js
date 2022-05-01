'use strict';



module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'profileImage'),
      queryInterface.addColumn(
        'Users',
        'profileConfig',
        {
          type: Sequelize.JSON,
          allowNull: false,
					defaultValue: {
            layout: "default",
            backgroundImage: "default",
            useBackground : true,
            backgroundColor : "#FFFFF"
          }
        }
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'profileImage',
        {
          type: Sequelize.STRING,
					allowNull: false,
					defaultValue: "default"
        }
      ),
      queryInterface.removeColumn('Users', 'profileConfig')
    ]);
  }
};
