import nc from 'next-connect';
import passport from 'passport';
import auth from '../../middlewares/auth';

const handler = nc()
  .use(auth)
  .get(passport.authenticate('steam'), (req, res) => {
    req.session.users.push(req.user);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  });

export default handler;
