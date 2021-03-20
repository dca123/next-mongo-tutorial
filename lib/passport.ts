import passport from 'passport';
import SteamStrategy from 'passport-steam';
import { findUserByUsername, validatePassword } from './db';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `http://localhost:3000/api/return`,
      realm: `http://localhost:3000/`,
      apiKey: process.env.API_KEY,
    },
    async (identifier, profile, done) => {
      const newUser = {
        steamid: profile.id,
        name: profile.displayName,
        imageUrl: profile.photos[2].value,
        profileUrl: profile._json.profileurl,
        countryCode: profile._json.loccountrycode,
      };
      return done(null, newUser);
    },
  ),
);
export default passport;
