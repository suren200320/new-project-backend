'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('PortfolioItems', 'image', {
      type: Sequelize.TEXT('long')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('PortfolioItems', 'image', {
      type: Sequelize.TEXT
    });
  }
};
