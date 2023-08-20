// //{"web":{"client_id":"905633045497-rtq3n91l277qc3cp5p3fs5odd65c28nh.apps.googleusercontent.com","project_id":"zomato-395210","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:4000/auth/google/callback"],"javascript_origins":["http://localhost:4000"]}}
// import passport from "passport";
// import googleOAuth from "passport-google-oauth20";
// import { UserModel } from "../database/allModels";

// const GoogleStrategy = googleOAuth.Strategy;

// export default () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:4000/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         // Creating new user
//         const newUser = {
//           fullname: profile.displayName,
//           email: profile.emails[0].value,
//           profilePic: profile.photos[0].value,
//         };
//         // Check whether user exists or not
//         try {
//           const existingUser = await UserModel.findOne({
//             email: newUser.email,
//           });
//           if (existingUser) {
//             // Generating jwt token
//             const token = existingUser.generateJwtToken();
//             done(null, { user: existingUser, token });
//           } else {
//             // Creating new user
//             const user = await UserModel.create(newUser);
//             done(null, { user, token: user.generateJwtToken() });
//           }
//         } catch (error) {
//           done(`Error occurred: ${error.message}`, null);
//         }
//       }
//     )
//   );
//   passport.serializeUser((userData, done) => done(null, { ...userData }));
//   passport.deserializeUser((id, done) => done(null, id));
// };
