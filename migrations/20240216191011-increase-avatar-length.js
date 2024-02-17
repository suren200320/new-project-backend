'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('StaffMembers', 'avatar', {
      type: Sequelize.TEXT('long')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('StaffMembers', 'avatar', {
      type: Sequelize.TEXT
    });
  }
};