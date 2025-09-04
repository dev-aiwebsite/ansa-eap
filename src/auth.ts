import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import bcrypt from 'bcrypt';
import { authConfig } from "./authConfig";
import { getUserByEmail } from "./serverActions/crudUsers";
import { ExtendedSession, ExtendedUser } from "./next-auth";

const login = async (credentials: { useremail: string; userpass: string; viaadmin?: boolean } ) => {
  try {
    const {data:user} = await getUserByEmail(credentials?.useremail)

    if (!user) throw new Error('wrong credentials')
    const viaAdmin = credentials?.viaadmin || false
  
    if (!viaAdmin) {
      // const isPasswordCorrect = await bcrypt.compare( credentials.userpass as string, user.password as string);
      const isPasswordCorrect = credentials.userpass === user.password
      if (!isPasswordCorrect) throw new Error('wrong credentials');
    }

    return user

  } catch {
    throw new Error('wrong credentials')
  }
}

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

        const extendedUser = user as ExtendedUser;
        
        token.first_name = extendedUser.first_name
        token.last_name = extendedUser.last_name
        token.email = extendedUser.email;
        token.img = extendedUser.img;
        token.user_id = extendedUser.id;
        token.role = extendedUser.role;
        // token.profileImage = user.profileImage;
        // token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const extendedSession = session as unknown as ExtendedSession;
        extendedSession.user_id = token.user_id as string;
        extendedSession.user_first_name = token.first_name as string;
        extendedSession.user_last_name = token.last_name as string;
        extendedSession.user_email = token.email as string;
        extendedSession.user_img = token.img as string;
        extendedSession.user_role = token.role as string;
      }
      return session;
    }
    
  }
})