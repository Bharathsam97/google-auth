const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../src/models/User');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleId: profile.id });
  
      if (user) {
        return done(null, user);
      } else {
        const newUser = new User({
            googleId: profile.id,
            username: profile.displayName, // Add the username from the profile
            email: profile.emails[0].value, // Add the email from the profile
          });
  
        await newUser.save();
        return done(null, newUser);
      }
    } catch (err) {
      return done(err);
    }
  }));
  


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
      try {
          const user = await User.findById(id).exec();
          done(null, user); // Send the user if found
      } catch (err) {
          done(err, null); // Send an error in case of an error
      }
  });