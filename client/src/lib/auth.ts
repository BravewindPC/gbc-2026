import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
// import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret:process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages : {
        signIn: "/sign-in"
    },
    providers: [
      ],
      callbacks: {
        async jwt({token,user}) {
            if (user) {
                return {
                    ...token,
                    name: user.name
                }
            }
            return token
        },
        async session({session,token}) {
            return{
                ...session,
                user: {
                    ...session.user,
                    name:token.name
                }
            }
        }
      }
}