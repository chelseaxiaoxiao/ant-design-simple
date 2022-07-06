export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      //  component: './user/Login/index',
      },
      {
        name: 'password_forget',
        path: '/user/password_forget',
        component: './user/PasswordForget',
      },
      {
        name: 'password_reset',
        path: '/user/password_reset',
        component: './user/PasswordReset',
      },
      {
        name: 'accept_invitation',
        path: '/user/accept_invitation',
        component: './user/AcceptInvitation',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/register',
      },
      {
        name: 'active',
        path: '/user/active',
        component: './user/active',
      },
      {
        name: 'confirm_email',
        path: '/user/confirm_email',
        component: './user/ConfirmEmail',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './balance/statistic',
  },
  {
    path: '/transaction',
    name: 'transaction',
    icon: 'shop',
    access: 'normalRouteFilter',
    meta: {
      permission: 'transaction'
    },
    routes: [
      {
        name: 'payment',
        path: '/transaction/payment',
        component: './TableList',
        access: 'normalRouteFilter',
        meta: {
          permission: 'transaction.payment'
        },
      },
      {
        name: 'refund',
        path: '/transaction/refund',
        component: './TableList',
        access: 'normalRouteFilter',
        meta: {
          permission: 'transaction.refund'
        },
      },
      {
        name: 'chargeback',
        path: '/transaction/chargeback',
        component: './TableList',
        access: 'normalRouteFilter',
        meta: {
          permission: 'transaction.chargeback'
        },
      },
    ],
  },
  {
    path: '/balance',
    name: 'balance',
    icon: 'transaction',
    access: 'normalRouteFilter',
    meta: {
      permission: 'balance'
    },
    routes: [
      {
        name: 'statistic',
        path: '/balance/statistic',
        component: './balance/statistic',
        access: 'normalRouteFilter',
        meta: {
          permission: 'balance.statistic'
        },
      },
      {
        name: 'list',
        path: '/balance/list',
        component: './balance/list',
        access: 'normalRouteFilter',
        meta: {
          permission: 'balance.list'
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
   // access: 'normalRouteFilter',
    meta: {
      permission: 'setting'
    },
    routes: [
      {
        name: 'account',
        path: '/setting/account',
        component: './setting/Account/index',
        meta: {
          permission: 'setting.general'
        },
      },
      {
        name: 'bank_account',
        path: '/setting/bank_account',
        component: './setting/bankAccount/index',
        meta: {
          permission: 'setting.general'
        },
      },
      {
        name: 'team',
        path: '/setting/team',
        component: './setting/team/index',
        meta: {
          permission: 'setting.general'
        },
      }
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
   // access: 'canAdmin',
    access: 'normalRouteFilter',
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
    name: 'account',
    icon: 'user',
    path: '/account',
    hideInMenu: true,
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },

];
