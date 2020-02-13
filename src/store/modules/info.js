import { getCategory } from '@/api/info'

const state = {
  category: [
    {
      id: "12",
      category_name: "国际信息",
    },
    {
      id: "10",
      category_name: "国内信息",
      children: [{
        id: "9",
        category_name: "省内信息",
      }]
    },
    {
      id: "14",
      category_name: "信息国际",
    },
    {
      id: "16",
      category_name: "信息guonei",
    },
  ],
}

const getters = {
  
}

const mutations = {
  
}

const actions = {
  // 获取信息分类接口
  getinfoCategory({ commit },data) {
    return new Promise((resolve,reject) => {
      getCategory(data).then(response => {
        state.category = response.data.data
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}