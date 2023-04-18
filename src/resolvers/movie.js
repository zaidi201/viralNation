"use strict";

const movieController = require("../controllers/movieController");
const { AuthenticationError } = require("apollo-server-express");
const message = require("../../constants/messages.json");

module.exports = {
  Query: {
    async allMovies(
      _,
      { name, description, limit, pageNumber, sort },
      { authUser }
    ) {
      //auth user will come from context
      if (!authUser) throw new AuthenticationError(message.sessionExpired);
      return movieController.getAllMovies(
        name,
        description,
        limit,
        pageNumber,
        sort
      );
    },
    async getMovieById(_, { id }, { authUser }) {
      if (!authUser) throw new AuthenticationError(message.sessionExpired);
      return movieController.getMovieById(id);
    },
  },
  Mutation: {
    async addMovie(_, { input }, { authUser }) {
      if (!authUser) throw new AuthenticationError(message.sessionExpired);

      return movieController.addMovie({ ...input });
    },

    async deleteMovie(_, { id }, { authUser }) {
      if (!authUser) throw new AuthenticationError(message.sessionExpired);

      return movieController.deleteMovie(id);
    },

    async updateMovie(_, { input }, { authUser }) {
      if (!authUser) throw new AuthenticationError(message.sessionExpired);

      return movieController.updateMovie({ ...input });
    },
  },
};
