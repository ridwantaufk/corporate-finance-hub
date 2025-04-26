import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.services";

const UserResolver = {
  Query: {
    getUsers: () => getUsers(),
    getUser: (_: any, { user_id }: { user_id: number }) => getUserById(user_id),
  },
  Mutation: {
    createUser: (
      _: any,
      {
        username,
        email,
        password,
        role,
      }: { username: string; email: string; password: string; role: string }
    ) => createUser(username, email, password, role),

    updateUser: (
      _: any,
      {
        user_id,
        username,
        email,
        password,
        role,
        phone_number,
        is_active,
      }: {
        user_id: number;
        username?: string;
        email?: string;
        password?: string;
        role?: string;
        phone_number?: string;
        is_active?: boolean;
      }
    ) =>
      updateUser(
        user_id,
        username,
        email,
        password,
        role,
        phone_number,
        is_active
      ),

    deleteUser: (_: any, { user_id }: { user_id: number }) =>
      deleteUser(user_id),
  },
};

export default UserResolver;
