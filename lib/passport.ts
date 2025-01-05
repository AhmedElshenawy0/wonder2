// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import bcrypt from "bcryptjs";
// import prisma from "@/utils/db";

// // Mock database (replace with your DB logic)
// const users = async () => {
//   const users = await prisma.user.findMany();
//   return users;
// };

// // Serialize user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user
// passport.deserializeUser((id, done) => {
//   const user = users.find((u) => u.id === id);
//   done(null, user);
// });

// // Local strategy for email/password
// passport.use(
//   new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//     const user = users.find((u) => u.email === email);
//     if (!user) return done(null, false, { message: "User not found" });
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) return done(err);
//       if (!isMatch) return done(null, false, { message: "Wrong password" });
//       return done(null, user);
//     });
//   })
// );

// // Google strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/api/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       let user = users.find((u) => u.googleId === profile.id);
//       if (!user) {
//         user = {
//           id: Date.now(),
//           googleId: profile.id,
//           email: profile.emails[0].value,
//           name: profile.displayName,
//         };
//         users.push(user);
//       }
//       done(null, user);
//     }
//   )
// );

// export default passport;
