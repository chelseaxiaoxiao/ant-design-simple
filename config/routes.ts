export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/account',
    name: 'account',
    icon: 'smile',
    access: 'normalRouteFilter',
    component: './Welcome',
  },
  {
    path: '/transaction',
    name: 'transaction',
    icon: 'smile',
    access: 'normalRouteFilter',
    routes: [
      {
        name: 'payment',
        path: '/transaction/payment',
        component: './TableList',
        access: 'normalRouteFilter',
      },
      {
        name: 'chargeback',
        path: '/transaction/chargeback',
        component: './TableList',
        access: 'normalRouteFilter',
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    icon: 'smile',
    access: 'normalRouteFilter',
    routes: [
      {
        name: 'bank_account',
        path: '/setting/bank_account',
        component: './TableList',
      },
      {
        name: 'permission',
        path: '/setting/permission',
        component: './TableList',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
