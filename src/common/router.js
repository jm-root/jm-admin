import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

const routerConfig = {
  '/': {
    models: ['user', 'login'],
    component: import('../apps/layouts/BasicLayout'),
  },
  '/dashboard/analysis': {
    models: ['chart'],
    component: import('../apps/Dashboard/Analysis'),
  },
  '/dashboard/monitor': {
    models: ['monitor'],
    component: import('../apps/Dashboard/Monitor'),
  },
  '/dashboard/workplace': {
    models: ['project', 'activities', 'chart'],
    component: import('../apps/Dashboard/Workplace'),
    // hideInBreadcrumb: true,
    // name: '工作台',
    // authority: 'admin',
  },
  '/form/basic-form': {
    models: ['form'],
    component: import('../apps/Forms/BasicForm'),
  },
  '/form/step-form': {
    models: ['form'],
    component: import('../apps/Forms/StepForm'),
  },
  '/form/step-form/info': {
    name: '分步表单（填写转账信息）',
    models: ['form'],
    component: import('../apps/Forms/StepForm/Step1'),
  },
  '/form/step-form/confirm': {
    name: '分步表单（确认转账信息）',
    models: ['form'],
    component: import('../apps/Forms/StepForm/Step2'),
  },
  '/form/step-form/result': {
    name: '分步表单（完成）',
    models: ['form'],
    component: import('../apps/Forms/StepForm/Step3'),
  },
  '/form/advanced-form': {
    models: ['form'],
    component: import('../apps/Forms/AdvancedForm'),
  },
  '/list/table-list': {
    models: ['rule'],
    component: import('../apps/List/TableList'),
  },
  '/list/basic-list': {
    models: ['list'],
    component: import('../apps/List/BasicList'),
  },
  '/list/card-list': {
    models: ['list'],
    component: import('../apps/List/CardList'),
  },
  '/list/search': {
    models: ['list'],
    component: import('../apps/List/List'),
  },
  '/list/search/projects': {
    models: ['list'],
    component: import('../apps/List/Projects'),
  },
  '/list/search/applications': {
    models: ['list'],
    component: import('../apps/List/Applications'),
  },
  '/list/search/articles': {
    models: ['list'],
    component: import('../apps/List/Articles'),
  },
  '/profile/basic': {
    models: ['profile'],
    component: import('../apps/Profile/BasicProfile'),
  },
  '/profile/advanced': {
    models: ['profile'],
    component: import('../apps/Profile/AdvancedProfile'),
  },
  '/result/success': {
    models: [],
    component: import('../apps/Result/Success'),
  },
  '/result/fail': {
    models: [],
    component: import('../apps/Result/Error'),
  },
  '/exception/403': {
    models: [],
    component: import('../apps/Exception/403'),
  },
  '/exception/404': {
    models: [],
    component: import('../apps/Exception/404'),
  },
  '/exception/500': {
    models: [],
    component: import('../apps/Exception/500'),
  },
  '/exception/trigger': {
    models: ['error'],
    component: import('../apps/Exception/triggerException'),
  },
  '/user': {
    models: [],
    component: import('../apps/layouts/UserLayout'),
  },
  '/user/login': {
    models: ['login'],
    component: import('../apps/User/Login'),
  },
  '/user/register': {
    models: ['register'],
    component: import('../apps/User/Register'),
  },
  '/user/register-result': {
    models: [],
    component: import('../apps/User/RegisterResult'),
  },
  // '/user/:id': {
  //   models: [], component: import('../apps/User/SomeComponent')
  // },
};

let routerDataCache;

const getRouterDataCache = app => {
  if (!routerDataCache) {
    routerDataCache = getRouterData(app);
  }
  return routerDataCache;
};

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      return createElement(component().default, {
        ...props,
        routerData: getRouterDataCache(app),
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: getRouterDataCache(app),
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

function findMenuKey(menuData, path) {
  const menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(key));
  if (menuKey == null) {
    if (path === '/') {
      return null;
    }
    const lastIdx = path.lastIndexOf('/');
    if (lastIdx < 0) {
      return null;
    }
    if (lastIdx === 0) {
      return findMenuKey(menuData, '/');
    }
    // 如果没有，使用上一层的配置
    return findMenuKey(menuData, path.substr(0, lastIdx));
  }
  return menuKey;
}

export const getRouterData = app => {
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const menuKey = findMenuKey(menuData, path);
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    const config = routerConfig[path];
    let router = {
      component: dynamicWrapper(app, config.models, () => config.component),
    };
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
