const Api500Error = require('../error_handling/api500Error');

const getLoginStatus = async (req, res, next) => {
  try {
    return res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  } catch (error) {
    return next(
      new Api500Error(
        'Login Error',
        'An error occurred while retrieving login status.',
      ),
    );
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    return res.send(JSON.stringify(req.oidc.user));
  } catch (error) {
    return next(
      new Api500Error(
        'Get Profile Error',
        'An error occurred while getting the user profile.',
      ),
    );
  }
};

module.exports = {
  getLoginStatus,
  getUserProfile,
};
