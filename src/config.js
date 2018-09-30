let config = {
  development: {
    api: 'http://localhost:8000/api',
    log_level: 'debug',
  },
  production: {
    api: 'https://api.jamma.cn',
  },
};

const defaultConfig = {
  title: 'Admin',
  copyright: '2018',
  logLevel: 'debug',
  modules: {
    sso: {},
    passport: {},
    login: {},
  },
};

const env = process.env.NODE_ENV || 'development';
config = config[env] || config.development;
config.env = env;

export default Object.assign({}, defaultConfig, config);
