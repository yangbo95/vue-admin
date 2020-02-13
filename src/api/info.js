import service from '@/utils/request';
// 添加一级分类

export function addFirstCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}

// 获取分类
export function getCategory(data) {
  
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data
  })
}
//删除分类
export function DeleteCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}

export function addInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}