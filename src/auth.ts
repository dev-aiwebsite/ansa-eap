import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import bcrypt from 'bcrypt';
import { authConfig } from "./authConfig";
import { getUserByEmail, User } from "./serverActions/crudUsers";
import { getWHO5ResponsesByUser } from "./serverActions/crudWho5";

export const login = async (credentials: { useremail: string; userpass: string; viaadmin?: boolean }): Promise<User & {who5Completed: boolean} | null> => {
  try {
    const { data: user } = await getUserByEmail(credentials?.useremail);
    if (!user) return null;

    const viaAdmin = credentials?.viaadmin || false;
    if (!viaAdmin) {
      const isPasswordCorrect = credentials.userpass === user.password;
      if (!isPasswordCorrect) return null;
    }

        // Add missing field
    const res = await getWHO5ResponsesByUser(user.id);
    const who5Completed = res.success && res.data && res.data.length > 0 || false;

    return { ...user, who5Completed };
  } catch {
    return null;
  }
};


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        useremail: {},
        userpass: {},
      },
      authorize: async (credentials) => {

        const user = await login(credentials as {
          useremail: string;
          userpass: string;
          viaadmin?: boolean;
        })

        if (user) {
          return user
        } else {
          throw new Error('wrong credentials 2')
        }
      },
    }),
  ], callbacks: {
    async jwt({ token, user }) {
      if (user) {
      
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.email = user.email;
        token.profile_img = user.profile_img ?? null;

        // Serialize roles array as plain array
        token.roles = Array.isArray(user.roles)
          ? [...user.roles]
          : [];

        token.user_id = user.id;

        // Default to false until checked
        token.who5Completed = false;
      }

      // Always refresh WHO5 flag if user_id exists
      if (token.user_id) {
        const res = await getWHO5ResponsesByUser(token.user_id as string);
        token.who5Completed = res.success && res.data && res.data.length > 0 || false;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
       
        session.user.id = token.user_id
        session.user.first_name = token.first_name
        session.user.last_name = token.last_name
        session.user.email = token.email
        session.user.profile_img = token.profile_img
        session.user.roles = token.roles
        session.user.who5Completed = token.who5Completed
      }
      return session;
    }

  }
})