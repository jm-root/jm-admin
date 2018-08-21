let config = {
  localhost: {
    api: 'http://localhost:3000',
  },
  development: {
    api: 'http://api.test.jamma.cn',
  },
  production: {
    api: 'http://api.jamma.cn',
  },
};

const defaultConfig = {
  title: 'Admin',
  copyright: '2018',
  logLevel: 'debug',
  modules: {
    ms: {},
    sso: {},
    passport: {},
    login: {},
  },
};

const env = process.env.NODE_ENV || 'development';
config = config[env] || config.development;
config.env = env;

export default Object.assign({}, defaultConfig, config);
