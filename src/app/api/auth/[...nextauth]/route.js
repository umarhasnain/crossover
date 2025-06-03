import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from '@/lib/mongodb.js';
import { User } from '@/backend/models/user.js';

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB(); // ✅ Actually call the function

                // ✅ Now use Mongoose model
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("No user found with the email");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return { id: user._id.toString(), name: user.name, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
});
