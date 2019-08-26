import React from "react";
import Loadable from 'react-loadable';
import {Spin} from 'antd';

const Dashboard = Loadable({
  loader:()=>import('../pages/Dashboard/Dashboard'),
  loading(){
    return <Spin />
  }
})
const Users = Loadable({
  loader:()=>import('../pages/Users/Users'),
  loading(){
    return <Spin />
  }
})

export default [
  {
    key: '/app/dashboard',
    title: 'Dashboard',
    zhTitle: '仪盘表',
    icon: 'dashboard',
    component: Dashboard
  },
  {
    key: '/app/user',
    title: 'Users',
    zhTitle: '用户管理',
    icon: 'user',
    component: Users
  },
  {
    key: '/app/message',
    title: 'Message',
    zhTitle: '消息管理',
    icon: 'message',
    subs: [
      {key: '/app/message/option1', parentKey: '/app/message', title: 'Option1', component: () => <div>Option1</div>},
      {key: '/app/message/option2', parentKey: '/app/message', title: 'Option2', component: () => <div>Option2</div>},
      {key: '/app/message/option3', parentKey: '/app/message', title: 'Option3', component: () => <div>Option3</div>}
    ]
  }
]