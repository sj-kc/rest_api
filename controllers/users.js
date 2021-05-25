const _helper = require('../helpers/helpers');
const _data = require('../helpers/data');

function users(data, callback) {
  const validMethods = ['post', 'get', 'put', 'delete'];

  if (!validMethods.includes(data.httpMethod)) return callback(405);

  const handler = {
    post(data, callback) {
      const firstname = data.payload.firstname;
      const lastname = data.payload.lastname;
      const phone = data.payload.phone;
      const password = data.payload.password;
      const agreement = data.payload.agreement;

      if (!firstname && !lastname && !phone && !password && !agreement) {
        return callback(500, { error: 'Missing required fields' });
      }

      if (phone.length !== 10) {
        return callback(500, { error: 'Phone min 10 characters' });
      }

      _data.read({ folder: 'users', file: phone }, (err = undefined) => {
        if (!err) return callback(400, { error: 'User already exist' });

        const hashedPassword = _helper.hash(password);

        if (!hashedPassword) {
          return callback(500, { error: 'Cant hash password' });
        }

        const user = {
          firstname,
          lastname,
          phone,
          hashedPassword,
          agreement: true,
        };

        _data.create({ folder: 'users', file: phone, data: user }, (err) => {
          if (err) return callback(400, { err });
          callback(200, { user });
        });
      });
    },
  };

  handler[data.httpMethod](data, callback);
}

module.exports = users;
