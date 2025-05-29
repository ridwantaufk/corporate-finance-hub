import { ApolloServer } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Response } from "express";
import typeDefs from "@/graphql/schemas";
import resolvers from "@/graphql/resolvers";
import { GraphQLContext, RequestWithUser } from "@/types";

/**
 * Function to create and configure Apollo Server
 * @returns Apollo server installation that has been configured
 */
export const createApolloServer = () => {
  return new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    // Plugins for handling errors and logging
    plugins: [
      {
        async requestDidStart() {
          return {
            async didEncounterErrors({ errors }) {
              // Log Errors for Debugging
              errors.forEach((error) => {
                console.error(`[GraphQL Error]: ${error.message}`, error);
              });
            },
          };
        },
      },
    ],
    // Error format to prevent sensitive information leaks
    formatError: (error) => {
      console.error("Formatted GraphQL Error:", error.message);
      console.error("Path GraphQL Error:", error.path);
      console.error("Location GraphQL Error:", error.locations);

      if (process.env.NODE_ENV === "production") {
        return {
          message: error.message,
          path: error.path,
          extensions: {
            code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
          },
        };
      }

      // at Development, can restore more details
      return error;
    },
  });
};

/**
 * Fungsi untuk membuat context GraphQL dari HTTP request
 * @param req - Express request object dengan informasi user
 * @param res - Express response object
 * @returns GraphQL context object
 */
export const createContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
  const request = req as RequestWithUser;

  return {
    req: request,
    res,
    user: request.user || null,
    session: req.session,
  };
};
