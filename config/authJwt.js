const authConfig = require("./authConfig");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

exports.getUser = async (req) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, authConfig.secret);
    } catch (e) {
      throw new AuthenticationError("your session expired");
    }
  }
  //throw new AuthenticationError("your session expired in index");
};
