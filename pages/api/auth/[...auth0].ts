import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';

const afterCallback = (req, res, session, state) => {
  console.log(session);
  return session;
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, { returnTo: '/controlCenter' });
    } catch (err) {
      res.status(err.status || 500).end(err.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (err) {
      res.status(err.status || 500).end(err.message);
    }
  },
});
