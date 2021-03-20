import nextConnect from 'next-connect';
import session from 'express-session';
import Redis from 'ioredis';
import redisStore from 'connect-redis';
import passport from '../lib/passport';

const redis = new Redis();
const RedisStore = redisStore(session);

const auth = nextConnect()
  .use(
    session({
      store: new RedisStore({ client: redis }),
      secret: `keyboard cat`,
      cookie: {},
    }),
  )
  .use((req, res, next) => {
    console.log(req);

    // Initialize mocked database
    // Remove this after you add your own database
    req.session.users = req.session.users || [];
    next();
  })
  .use(passport.initialize())
  .use(passport.session());

export default auth;
