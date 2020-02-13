import { Login } from '@/api/login';
import { setToken, setUserName, getUserName } from '@/utils/app'

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  token: '',
  username: '' || getUserName(),
}
 
const getters = {
  isCollapse: state => state.isCollapse
}

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // console.log(state.isCollapse);
    // Cookie.set('isCollapse',state.isCollapse);
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state,value) {
    state.token = value
  },
  SET_USERNAME(state,value) {
    state.username = value
  }
}

const actions = {
  login({ commit },requestData) {
    return new Promise((resolve,reject) => {
      Login(requestData).then((response) => {
        let {data} = response.data;
        // console.log(data);
        commit('SET_TOKEN',data.token);
        commit('SET_USERNAME',data.username);
        setToken(data.token);
        setUserName(data.username);
        resolve(response);
      }).catch(error => {
        reject(error);
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
