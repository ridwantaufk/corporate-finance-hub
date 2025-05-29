import { GraphQLError } from "graphql";
import { UserRole, GraphQLContext } from "../../types";

/**
 * Authentication guard to ensure the user is logged in
 * @param context - GraphQL Context that contains user information
 * @throws {GraphQLError} Jika user tidak terautentikasi
 */
export const requireAuth = (context: GraphQLContext): void => {
  if (!context.user) {
    throw new GraphQLError("Authentication required", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};

/**
 * Authorization Guard to ensure users have the right role
 * @param context - GraphQL context that contains user information
 * @param allowedRoles - array roles allowed for access
 * @throws {GraphQLError} if the user does not have a permit
 */
export const requireRole = (
  context: GraphQLContext,
  allowedRoles: UserRole[]
): void => {
  // keep the Teradentication User first
  requireAuth(context);

  if (!context.user || !allowedRoles.includes(context.user.role as UserRole)) {
    throw new GraphQLError(
      "You do not have permission to perform this action",
      {
        extensions: {
          code: "FORBIDDEN",
          http: { status: 403 },
        },
      }
    );
  }
};
