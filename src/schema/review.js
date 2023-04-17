const { gql } = require("apollo-server-express");

module.exports = gql`
  type review {
    id: Int!
    comment: String!
    rating: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    movie: movie
    user: user
  }
  input addReview {
    comment: String!
    rating: Int
    userId: Int!
    movieId: Int!
  }
  input updateReview {
    comment: String
    rating: Int
    id: Int!
    userId: Int!
  }
  extend type Query {
    getAllreviews(
      comment: String
      limit: Int
      pageNumber: Int
      sort: String
    ): [review]
  }
  extend type Mutation {
    addReview(input: addReview!): review
    updateReview(input: updateReview): message
    deleteReview(id: Int!): message
  }
`;
