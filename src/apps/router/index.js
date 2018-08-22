import Loader from './loader'

const routerConfig = {
  '/': {
    models: ['user', 'login'],
    component: import('../layouts/BasicLayout'),
  },
  '/dashboard/analysis': {
    models: ['chart'],
    component: import('../Dashboard/Analysis'),
  },
  '/dashboard/monitor': {
    models: ['monitor'],
    component: import('../Dashboard/Monitor'),
  },
  '/dashboard/workplace': {
    models: ['project', 'activities', 'chart'],
    component: import('../Dashboard/Workplace'),
    // hideInBreadcrumb: true,
    // name: '工作台',
    // authority: 'admin',
  },
  '/form/basic-form': {
    models: ['form'],
    component: import('../Forms/BasicForm'),
  },
  '/form/step-form': {
    models: ['form'],
    component: import('../Forms/StepForm'),
  },
  '/form/step-form/info': {
    name: '分步表单（填写转账信息）',
    models: ['form'],
    component: import('../Forms/StepForm/Step1'),
  },
  '/form/step-form/confirm': {
    name: '分步表单（确认转账信息）',
    models: ['form'],
    component: import('../Forms/StepForm/Step2'),
  },
  '/form/step-form/result': {
    name: '分步表单（完成）',
    models: ['form'],
    component: import('../Forms/StepForm/Step3'),
  },
  '/form/advanced-form': {
    models: ['form'],
    component: import('../Forms/AdvancedForm'),
  },
  '/list/table-list': {
    models: ['rule'],
    component: import('../List/TableList'),
  },
  '/list/basic-list': {
    models: ['list'],
    component: import('../List/BasicList'),
  },
  '/list/card-list': {
    models: ['list'],
    component: import('../List/CardList'),
  },
  '/list/search': {
    models: ['list'],
    component: import('../List/List'),
  },
  '/list/search/projects': {
    models: ['list'],
    component: import('../List/Projects'),
  },
  '/list/search/applications': {
    models: ['list'],
    component: import('../List/Applications'),
  },
  '/list/search/articles': {
    models: ['list'],
    component: import('../List/Articles'),
  },
  '/profile/basic': {
    models: ['profile'],
    component: import('../Profile/BasicProfile'),
  },
  '/profile/advanced': {
    models: ['profile'],
    component: import('../Profile/AdvancedProfile'),
  },
  '/result/success': {
    models: [],
    component: import('../Result/Success'),
  },
  '/result/fail': {
    models: [],
    component: import('../Result/Error'),
  },
  '/exception/403': {
    models: [],
    component: import('../Exception/403'),
  },
  '/exception/404': {
    models: [],
    component: import('../Exception/404'),
  },
  '/exception/500': {
    models: [],
    component: import('../Exception/500'),
  },
  '/exception/trigger': {
    models: ['error'],
    component: import('../Exception/triggerException'),
  },
  '/user': {
    models: [],
    component: import('../layouts/UserLayout'),
  },
  '/user/login': {
    models: ['login'],
    component: import('../User/Login'),
  },
  '/user/register': {
    models: ['register'],
    component: import('../User/Register'),
  },
  '/user/register-result': {
    models: [],
    component: import('../User/RegisterResult'),
  },
  // '/user/:id': {
  //   models: [], component: import('../User/SomeComponent')
  // },
}

const context = require.context('../', true, /^.\/\w{1,}\/index.js$/)
const apps = context
  .keys()
  .filter(item => item !== './sdk/index.js' && item !== './router/index.js')
  .map(key => key.substring(2, key.indexOf('/index.js')))

export const getRouterData = app => {
  const loader = new Loader(app)
  let routerData = loader.load(routerConfig, model => require(`../../models/${model}`).default)

  apps.forEach(name => {
    const appConfig = require(`../${name}`).default
    routerData = loader.load(appConfig.routes, appConfig.loader)
  })

  return routerData
}
