// // /pages/api/auth/signup.js
// import clientPromise from "@/lib/mongodb.js";
// import bcrypt from "bcrypt";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db();

//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//     };

//     await db.collection("users").insertOne(newUser);

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }



//routtee================>
    // // app/api/auth/signup/route.js
// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, password } = body;

//     if (!name || !email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db();

//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({ error: "User already exists" }, { status: 409 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//     };

//     await db.collection("users").insertOne(newUser);

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// // ...nextauth

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcrypt";

// export default NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const client = await clientPromise;
//         const db = client.db();

//         const user = await db.collection("users").findOne({ email: credentials.email });
//         if (!user) {
//           throw new Error("No user found with the email");
//         }

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) {
//           throw new Error("Invalid password");
//         }

//         // Return user object (NextAuth will store in JWT/session)
//         return { id: user._id.toString(), name: user.name, email: user.email };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/sign-in", // your custom signin page route
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
