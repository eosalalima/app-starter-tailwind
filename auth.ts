import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";
import { authenticator } from "@otplib/preset-default";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import db from "./db/drizzle";
import { users } from "./db/usersSchema";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
                token: {},
            },
            async authorize(credentials) {
                const { email, password, token } = credentials ?? {};

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email));

                if (!user) {
                    throw new Error("Incorrect credentials");
                } else {
                    const passwordCorrect = await compare(password, user.password!);

                    if (!passwordCorrect) {
                        throw new Error("Incorrect credentials");
                    }

                    if (user.twoFactorAuthActivated) {
                        if (!token) {
                            throw new Error("Invalid two-factor authentication token");
                        }

                        const tokenValid = authenticator.check(token, user.twoFactorAuthSecret ?? "");

                        if (!tokenValid) {
                            throw new Error(
                                "Invalid two-factor authentication token"
                            );
                        }
                    }
                }

                return { id: user.id.toString(), email: user.email };
            },
        }),
    ],
};

export const auth = () => getServerSession(authOptions);

const authHandler = NextAuth(authOptions);

export const handlers = { GET: authHandler, POST: authHandler };
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
