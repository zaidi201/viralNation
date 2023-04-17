const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Datetime

  type movie {
    id: Int!
    movieName: String
    description: String
    director: String
    releaseDate: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    message: String
    reviews: [review]
    user: user
  }

  input addMovie {
    movieName: String!
    description: String
    director: String
    releaseDate: DateTime
  }
  input updateMovie {
    id: Int!
    movieName: String
    description: String
    director: String
    releaseDate: DateTime
  }
  extend type Query {
    allMovies(
      name: String
      description: String
      limit: Int
      pageNumber: Int
      sort: String
    ): [movie]
    getMovieById(id: Int!): movie
  }
  extend type Mutation {
    addMovie(input: addMovie!): movie
    updateMovie(input: updateMovie): message
    deleteMovie(id: Int!): message
  }
`;
