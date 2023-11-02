const router = require('express').Router();

const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const controller = require('../controllers/auth0');

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

router.get('/', controller.getLoginStatus);

router.get('/profile', controller.getUserProfile);

module.exports = router;
