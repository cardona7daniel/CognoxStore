import asyncComponent from './AsyncComponent';

let i = 0;
const index = () => i + 1;

const routesApp = [
  {
    index: index(),
    path: '/',
    component: asyncComponent(() =>
      import('./Pages/login').then(module => module.default),
    ),
    exact: true,
  },
  {
    index: index(),
    path: '/home',
    component: asyncComponent(() =>
      import('./Pages/home').then(module => module.default),
    ),
    exact: true,
  },
];

export default [...routesApp];
