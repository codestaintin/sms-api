'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Contacts', [
      {
      name: 'Sample John',
      phoneNumber: '08080310980',
      createdAt: '2019-02-28 17:58:46.845+01',
      updatedAt: '2019-02-28 17:58:46.845+01'
      },
      {
        name: 'Sample Doe',
        phoneNumber: '09896754453',
        createdAt: '2019-02-28 17:58:46.845+01',
        updatedAt: '2019-02-28 17:58:46.845+01'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Contacts', null, {});
  }
};
