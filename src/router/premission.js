import router from './index';

import { getToken } from '@/utils/app'

const whiteRouter = ['/login']

router.beforeEach( (to, from, next) => {
  if(getToken()) {
    next();
    console.log('存在');
    // 路由动态添加，分配菜单，每个角色分配不同的路由权限
  }else {
    console.log('不存在');
    // console.log(whiteRouter.indexOf('/login') !== -1);
    if(whiteRouter.indexOf(to.path) !== -1) {
      next();
    }else {
      next('/login');
    }
  }
  
})