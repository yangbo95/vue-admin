import Vue from 'vue';
import svgIcon from './svgIcon'

// 自定义全局组件
Vue.component('svg-icon', svgIcon);



// require.context : 读取指定目录的文件
// 第一个： 目录
// 第二个： 是否遍历子级目录、
// 第三个： 定义遍历文件规则

// 解析svg 文件

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
