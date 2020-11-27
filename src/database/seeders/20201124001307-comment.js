module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [{
      id: "9ccff1f3-135f-41d9-adf2-b92c8ade4d02",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      task: "Jog round my Estate",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "c375c640-81ff-405a-89a8-460ea2f71756",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      task: "start learning Nodejs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "9ccff1f3-135f-41d9-adf2-b92c8ade4d33",
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      task: "Download omah lay E.p",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
