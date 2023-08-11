'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reservations', [
      {
        SessionId: 1,
        date: "2023-10-07",
        price: 60000,
        status: "Paid",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        SessionId: 1,
        date: "2023-10-08",
        price: 60000,
        status: "Paid",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        SessionId: 3,
        date: "2023-10-08",
        price: 80000,
        status: "Canceled",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        SessionId: 2,
        date: "2023-10-07",
        price: 60000,
        status: "No Payment",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
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
    await queryInterface.bulkDelete("Reservations");
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
