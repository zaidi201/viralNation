const { ApolloServer } = require("apollo-server-express");
const schema = require("./src/schema");
const resolvers = require("./src/resolvers");
const authJwt = require("./config/authJwt");
const express = require("express");
const db = require("./models");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const port = process.env.PORT || 4000;

db.sequelize.sync({ force: true }).then(async () => {
  console.log("Drop and re-sync db.");
});

const app = express();
app.use(cors());

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    //using this for authentication
    const authUser = await authJwt.getUser(req);
    return {
      authUser,
    };
  },
});

server.applyMiddleware({ app, path: "/graphql" });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: port }, () => {
  console.log(`Server ready at http://localhost:${port}/graphql`);
});
