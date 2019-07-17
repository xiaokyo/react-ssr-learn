import Home from '../app/home';
import Notification from '../app/notification';

//redux
import {fetchData, TimeoutData} from '../redux';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    loadData: TimeoutData,
  },
  {
    path: '/notification',
    exact: true,
    component: Notification,
    loadData: fetchData,
  },
  {
    path: '/list',
    exact: true,
    component: Notification,
    loadData: TimeoutData,
  },
];
