const { GraphQLDateTime } = require("graphql-iso-date");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const userResolver = require("./user");
const movieResolver = require("./movie");
const reviewResolver = require("./review");

module.exports = [
  customScalarResolver,
  movieResolver,
  userResolver,
  reviewResolver,
];
