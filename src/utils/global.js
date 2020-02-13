import { MessageBox, Message } from 'element-ui';

// 定义全局函数方法，在main。js中全局引用 
export default {
  install(Vue, options) {
    Vue.prototype.confirm = (params) => {
      
      MessageBox.confirm(params.content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if(params.fn && params.id) {
          params.fn(params.id || '');
        }
        console.log('删除成功')
       
          
        

        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    }
  }
  
}
