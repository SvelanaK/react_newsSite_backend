const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { Users } = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_FOR_ACCESS,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await Users
          .findOne({ where: { id: payload.id } });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return err.message;
      }
    }),
  );
};
