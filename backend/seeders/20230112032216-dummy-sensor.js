'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sensors',[
      {
        color: "#FF0000",
        note: "COLOR_RED",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#FF8000",
        note: "COLOR_ORANGE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#00FF00",
        note: "COLOR_GREEN",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#0000FF",
        note: "COLOR_BLUE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#7F00FF",
        note: "COLOR_PURPLE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#FFFF00",
        note: "COLOR_YELLOW",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#660033",
        note: "COLOR_MAROON",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#006600",
        note: "COLOR_DARK_GREEN",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#87CEEB",
        note: "COLOR_SKY_BLUE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: "#00008B",
        note: "COLOR_DARK_BLUE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sensors', null, {});
  }
};
