const locales = require('./locales');

const routes = [
  {
    path: '/test',
    icon: 'form',
    name: 'test',
    routes: [
      {
        path: '/test/list',
        component: './test/routes/list',
        name: 'list',
      },
    ],
  },
];

module.exports = {
  locales,
  routes,
};
