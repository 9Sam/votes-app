import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserService from "@/services/userService/user.service";
import authService from "@/services/authService/auth.service";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
         name: "Sign in",
         credentials: {
            email: {
               label: "Email",
               type: "email",
               placeholder: "example@example.com",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
               return null;
            }

            try {
               const user = (await UserService.getUserWithPassword(
                  credentials.email
               )) as any;

               if (
                  !user ||
                  !(await compare(credentials.password, user.password))
               ) {
                  return null;
               }

               return user;
            } catch (error) {
               console.log(error);
            }
         },
      }),
   ],
   callbacks: {
      async signIn({ credentials, profile, account, user }) {
         console.log(user)
         const result = await authService.createUserIfNotExists(credentials as any, user);

         return result;
      },
      session: ({ session, token }) => {
         return {
            ...session,
            user: {
               ...session.user,
               id: token.id,
               randomKey: token.randomKey,
            },
         };
      },
      jwt: ({ token, user }) => {
         if (user) {
            const u = (user as unknown) as any;
            return {
               ...token,
               id: u.id,
               randomKey: u.randomKey,
            };
         }
         return token;
      },
   },
   pages: {
      signIn: "/auth/login",
      newUser: "/auth/signup",
   },
   session: {
      strategy: "jwt",
   },
});

export { handler as GET, handler as POST };
