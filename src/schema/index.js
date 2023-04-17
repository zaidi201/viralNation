const { gql } = require("apollo-server-express");
const User = require("./user");
const Movie = require("./movie");
const Review = require("./review");

const baseSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = [baseSchema, User, Movie, Review];
