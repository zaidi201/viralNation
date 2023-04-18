"use strict";

const reviewController = require("../controllers/reviewController");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Query: {
    async getAllreviews(_, { comment, limit, pageNumber, sort }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");

      return reviewController.getAllreviews(
        authUser.id,
        comment,
        limit,
        pageNumber,
        sort
      );
    },
  },
  Mutation: {
    async addReview(_, { input }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");

      return reviewController.addReview({ ...input });
    },
    async deleteReview(_, { id }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");

      return reviewController.deleteReview(id);
    },
    async updateReview(_, { input }, { authUser }) {
      if (!authUser) throw new AuthenticationError("your session expired");
      //user can only update their review check(from token we will get user id)
      if (input.userId != authUser.id)
        throw new AuthenticationError("you cannot update other person review");

      return reviewController.updatereview({ ...input });
    },
  },
};
