export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home', authority: ['admin', 'user'] },
      {
        icon: 'dashboard',
        path: '/home',
        name: 'home',
        component: './Home/Home',
      },
      {
        icon: 'shopping',
        path: '/shipments',
        name: 'shipments',
        component: './Shipments/ShipmentsList',
      },
      {
        icon: 'shop',
        path: '/participants',
        name: 'participants',
        component: './Participants/ParticipantsList',
      },
      {
        path: '/participants/:id',
        name: 'participantDetail',
        hideInMenu: true,
        component: './Participants/ParticipantDetail',
      },
      {
        path: '/shipments/:id',
        name: 'shipmentDetail',
        hideInMenu: true,
        component: './Shipments/ShipmentDetail',
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
