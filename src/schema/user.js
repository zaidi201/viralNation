const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type user {
    id: Int
    userName: String
    email: String
    token: String
    message: String
  }
  type message {
    message: String
  }
  input addUser {
    userName: String!
    email: String!
    password: String!
  }
  input login {
    email: String!
    password: String!
  }
  input resetPassword {
    userId: Int!
    password: String!
    token: String!
  }

  extend type Mutation {
    login(input: login): user
    createUser(input: addUser!): message
    forgetPassword(email: String!): message
    resetPassword(input: resetPassword): message
  }
`;
