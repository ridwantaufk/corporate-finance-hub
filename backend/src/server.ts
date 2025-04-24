import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import db from "./config/db";

const app: any = express();

// Setup Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    db,
  }),
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(
    `Server berjalan di http://localhost:${PORT}${server.graphqlPath}`
  )
);
