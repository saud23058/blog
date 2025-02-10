import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DBconnection } from "./lib/db";
import { userModel } from "./models/user";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;
        if (!email || !password) {
          throw new CredentialsSignin("Please provide the Credentials");
        }

        await DBconnection();
        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("User doesn't exist");
        }

        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) {
          throw new Error("password is incorrect");
        }

        const userData = {
          username: user.name,
          email: user.email,
          id: user._id,
        };
        return userData;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    signIn: async ({ account, user }) => {
      if (account?.provider === "github") {
        try {
          const email = user.email || account?.providerAccountId + "@github.com"; // 
          const name = user.name;
          const image = user.image;
          
          
    
          const isExist = await userModel.findOne({ email });
          if (!isExist) {
            await userModel.create({ email, name, image });
          }
        } catch (error: any) {
          throw new Error("Unable to continue through GitHub: " + error.message);
        }
      }
      return true;
    }
  },

  secret: process.env.AUTH_SECRET,
});
