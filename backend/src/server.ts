import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";

async function startServer() {
  const app: Express = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  (server as any).applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log(
      `Server is running at http://localhost:4000${server.graphqlPath}`
    )
  );
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
