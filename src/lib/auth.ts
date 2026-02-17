import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret:process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.username || !credentials.password) {
                    throw new Error('Credentials must be provided');
                }
    
                const user = await db.user.findFirst({
                    where: { name: credentials.username },
                });
    
                if (user && user.password && user.password == credentials.password) {
                    return user;
                } else {
                    throw new Error('Invalid username or password');
                }
            },
        }),
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
    },
    pages: {
        signIn: '/signin',
    },
}