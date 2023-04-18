"use strict";

const movieController = require("../controllers/movieController");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Query: {
    async allMovies(
      _,
      { name, description, limit, pageNumber, sort },
      { authUser }
    ) {
      //auth user will come from context
      if (!authUser) throw new AuthenticationError("your session expired");
      return movieController.getAllMovies(
        name,
        description,
        limit,
        pageNumber,
        sort
      );
    },
    async getMovieById(_, { id }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");
      return movieController.getMovieById(id);
    },
  },
  Mutation: {
    async addMovie(_, { input }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");

      return movieController.addMovie({ ...input });
    },

    async deleteMovie(_, { id }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");

      return movieController.deleteMovie(id);
    },

    async updateMovie(_, { input }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");

      return movieController.updateMovie({ ...input });
    },
  },
};
