const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../graphql/typeDefs");
const resolvers = require("../graphql/resolvers");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();

async function startServer() {
  const app = express();
  app.use(authMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
