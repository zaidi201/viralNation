const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

exports.getUser = async (req) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.secret);
    } catch (e) {
      throw new AuthenticationError("your session expired");
    }
  }
};
