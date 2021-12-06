const passport = require('passport');
const passportJwt = require('passport-jwt');

const { Strategy, ExtractJwt } = passportJwt;

const secret = 'secret';

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = (app) => {
  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await app.services.user.getById(payload.id);
      if (user) {
        done(null, { ...payload });
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
