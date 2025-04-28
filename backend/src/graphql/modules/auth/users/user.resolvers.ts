import {
  loginUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.services";

const UserResolver = {
  Query: {
    getUsers: () => getUsers(),
    getUser: (_: any, { userId }: { userId: number }) => getUserById(userId),
  },
  Mutation: {
    login: async (_: any, args: { username: string; password: string }) => {
      const { username, password } = args;
      const result = await loginUser(username, password);

      console.log("=== USER LOGIN SUCCESS ===");
      console.log("User Data:", result.user);
      console.log("Access Token:", result.accessToken);
      console.log("===========================");

      return {
        accessToken: result.accessToken,
        user: result.user,
      };
    },

    createUser: (
      _: any,
      {
        username,
        email,
        password,
        role,
        phone_number,
        is_active,
      }: {
        username: string;
        email: string;
        password: string;
        role: string;
        phone_number?: string;
        is_active?: boolean;
      }
    ) => createUser(username, email, password, role, phone_number, is_active),

    updateUser: (
      _: any,
      {
        userId,
        username,
        email,
        password,
        role,
        phone_number,
        is_active,
      }: {
        userId: number;
        username?: string;
        email?: string;
        password?: string;
        role?: string;
        phone_number?: string;
        is_active?: boolean;
      }
    ) =>
      updateUser(
        userId,
        username,
        email,
        password,
        role,
        phone_number,
        is_active
      ),

    deleteUser: (_: any, { userId }: { userId: number }) => deleteUser(userId),
  },
};

export default UserResolver;
