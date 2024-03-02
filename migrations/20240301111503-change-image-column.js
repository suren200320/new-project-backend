'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('BlogItems', 'image', {
      type: Sequelize.TEXT('long')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('BlogItems', 'image', {
      type: Sequelize.TEXT
    });
  }
};
