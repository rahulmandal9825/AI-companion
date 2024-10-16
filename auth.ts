import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "./lib/prismadb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages:{
    signIn:'/auth/login',
    error:'/auth/error',
  },
  events:{
    async linkAccount({user}){
      await prismadb.user.update({
        where:{
          id: user.id
        },
        data:{
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks:{
       
        async session({token, session}){
          if (token.sub && session.user) {
            session.user.id = token.sub
          }

          return session
        },
        async jwt({token}) {
          return token
        }
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,  // Add this line for the secret
  ...authConfig,
});
