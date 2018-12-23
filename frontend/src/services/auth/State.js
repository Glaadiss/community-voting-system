const authenticated = 'isAuthenticated';
function isAuthenticated() {
  try {
    return JSON.parse(localStorage.getItem(authenticated));
  } catch (error) {
    return false;
  }
}

function authenticate(cb) {
  localStorage.setItem(authenticated, true);
  cb();
}

function register(cb) {
  localStorage.setItem(authenticated, true);
  cb();
}

function signout(cb) {
  localStorage.setItem(authenticated, false);
  cb();
}

export default {
  register,
  isAuthenticated,
  authenticate,
  signout,
};
