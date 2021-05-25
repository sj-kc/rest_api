const env = {
  dev: {
    httpPort: '3000',
    httpsPort: '3001',
    name: 'dev',
    hashingSecret: 'secret',
  },

  prod: {
    httpPort: '5000',
    httpsPort: '5001',
    name: 'prod',
    hashingSecret: 'secret',
  },
};

const enviroment = !process.env.NODE_ENV ? env['dev'] : env['prod'];

module.exports = enviroment;
