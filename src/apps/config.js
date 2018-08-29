let config = {
  development: {
    api: 'http://localhost:8000',
  },
  production: {
    api: 'http://api.jamma.cn',
    noProxy: true,
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
