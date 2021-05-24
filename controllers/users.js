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
        return callback(500, { error: 'Min 10 characters' });
      }
    },
  };

  handler[data.httpMethod](data, callback);
}

module.exports = users;
