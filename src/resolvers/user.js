"use strict";

const userController = require("../controllers/userController");

module.exports = {
  Mutation: {
    async login(_, { input }) {
      return userController.userLogin({ ...input });
    },

    async createUser(_, { input }) {
      return userController.addUser({ ...input });
    },

    async forgetPassword(_, { email }) {
      return userController.forgotPassword(email);
    },

    async resetPassword(_, { input }) {
      return userController.resetPassword({ ...input });
    },
  },
};
