import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import layout from '@/layout/index'

const routes = [
  {
    path: "/",
    hidden: true,
    redirect: '/login',
    meta: {
      title: '主页'
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: "/index",
    name: "home",
    component: layout,
    redirect: '/console',
    meta: {
      title: '控制台', icon: 'console'
    },
    children: [
      {
        path: "/console",
        name: "console",
        component: () => import("@/views/console"),
        meta: {
          title: '首页'
        }
      },
    ]
  },
  {
    path: "/info",
    name: "info",
    component: layout,
    meta: {
      title: '信息管理', icon: 'info'
    },
    children: [
      {
        path: "/infoIndex",
        name: "infoIndex",
        component: () => import("@/views/info/index"),
        meta: {
          title: '信息列表'
        }
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        component: () => import("@/views/info/category"),
        meta: {
          title: '信息分类'
        }
      },
      {
        path: "/infoDetail",
        name: "infoDetail",
        component: () => import("@/views/info/detail"),
        hidden: true,
        meta: {
          title: '信息详情'
        }
      },
    ]
  },
  {
    path: "/user",
    name: "user",
    component: layout,
    meta: {
      title: '用户管理', icon: 'user'
    },
    children: [
      {
        path: "/userIndex",
        name: "userIndex",
        component: () => import("@/views/user/index"),
        meta: {
          title: '用户列表'
        }
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
