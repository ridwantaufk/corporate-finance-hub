// src/server.ts
import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4"; // Untuk Express Middleware
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();

  // Middleware untuk parsing body request JSON
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Middleware untuk Apollo Server
  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
