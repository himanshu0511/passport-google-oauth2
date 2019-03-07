/**
 * `UserInfoError` error.
 *
 * @constructor
 * @param {string} [message]
 * @param {string} [code]
 * @access public
 */
function UserInfoError(message, code) {
  Error.call(this);
  Error.captureStackTrace(this, UserInfoError);
  this.name = 'UserInfoError';
  this.message = message;
  this.code = code;
}

// Expose constructor.
module.exports = UserInfoError;
