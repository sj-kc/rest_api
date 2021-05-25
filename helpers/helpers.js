const crypto = require('crypto');
const config = require('../config');

const helpers = {
  hash(password) {
    if (typeof password !== 'string' && !password.length) return;

    const hash = crypto
      .createHmac('sha256', config.hashingSecret)
      .update(password)
      .digest('hex');

    return hash;
  },
};

module.exports = helpers;
