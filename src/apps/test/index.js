const routes = {
  '/test/list': {
    models: ['test'],
    component: import('./routes/list'),
  },
};

function loader(model) {
  return require(`./models/${model}`).default;
}

export default { routes, loader };
