import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloServer, createContext } from "./config/apolloServer";
import { configureExpressApp } from "./config/expressConfig";
import { validationMiddleware } from "./middleware/validationMiddleware";
import { logRequestMiddleware } from "./middleware/logRequestMiddleware";

dotenv.config();

/**
 * Start server function
 */
async function startServer() {
  try {
    // Konfigurasi Express app
    const app = configureExpressApp();

    // Membuat dan start Apollo Server
    const apolloServer = createApolloServer();
    await apolloServer.start();

    // Menambahkan endpoint GraphQL dengan Apollo middleware
    app.use(
      "/graphql",
      logRequestMiddleware,
      expressMiddleware(apolloServer, {
        context: createContext,
      })
    );

    // Menentukan port dari environment variable atau fallback ke 4000
    const PORT = process.env.PORT || 4000;

    // Start server
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Start server
startServer();
