import axios from 'axios';
import { Message } from 'element-ui'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});
// console.log(process.env.NODE_ENV);

service.interceptors.request.use((config) => {

  config.headers.token = '111111'

  return config;
},(error) => {
  return Promise.reject(error);
})

service.interceptors.response.use((response) => {
  // console.log(response);
  let data = response.data;
  if(data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data);
  }else {
    return response;
    // return Promise resolve;
  }
  
},(error) => {
  return Promise.reject(error);
})

export default service