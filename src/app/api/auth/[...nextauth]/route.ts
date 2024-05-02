import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from 'next-auth';
import bcrypt from "bcryptjs";
import { User } from "@/lib/models";
import connectToDB from "@/lib/utils";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials: Record<string, string> | undefined) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                
                const { email, password } = credentials;
                
                try {
                    await connectToDB();
                    const user = await User.findOne({ email });
            
                    if (!user) {
                        return null;
                    }
            
                    const passwordsMatch = await bcrypt.compare(password, user.password);
            
                    if (!passwordsMatch) {
                        return null;
                    }
            
                    return user;
                } catch (error) {
                    console.log(error);
                    return null; 
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.username = user.username;
                token.isAdmin = user.isAdmin;
                token.id = user._id;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user.isAdmin = token.isAdmin; 
            session.user.username = token.username;
            session.user.id = token.id;
            return session;
        },
    },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}