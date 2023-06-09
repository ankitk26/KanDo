import { account } from "@/lib/appwriteAccount";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "abc@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials, req) {
                try {
                    const email = credentials?.email as string;
                    const password = credentials?.password as string;

                    const session = await account.createEmailSession(
                        email,
                        password
                    );

                    return { id: session.userId, email };
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
