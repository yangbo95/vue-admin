import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, getUserName } from './app';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});
// console.log(process.env.NODE_ENV);

service.interceptors.request.use((config) => {
  // console.log(getToken());
  config.headers['Token'] = getToken();
  config.headers['UserName'] = getUserName();
  // console.log(config);
  return config;
},(error) => {
  return Promise.reject(error);
})

service.interceptors.response.use((response) => {
 //  console.log(response);
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