'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sessions', [
      {
        name: "13.00 - 17.00",
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "19.00 - 23.00",
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "13.00 - 17.00",
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "19.00 - 23.00",
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "13.00 - 17.00",
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "19.00 - 23.00",
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sessions');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
