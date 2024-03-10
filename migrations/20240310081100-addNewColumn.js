'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('PartnerItems', 'category', {
      type: Sequelize.STRING,
      allowNull: true, // или false в зависимости от вашего требования к новому столбцу
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('PartnerItems', 'category');
  }
};
