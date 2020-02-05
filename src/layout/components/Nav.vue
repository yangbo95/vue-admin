<template>
  <div id="nav-wrap">
    <el-menu default-active="1-4-1" background-color="transparent" 
      class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" 
      :collapse="isCollapse" text-color="#fff" active-text-color="#fff" :router="true">

      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id"  :index="index+''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i class="el-icon-help"></i> -->
            <svg-icon iconClass="console" className="console"/>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
            <el-menu-item v-for="subItem in item.children" 
            :key="subItem.id" :index="subItem.path">
              {{subItem.meta.title}}
            </el-menu-item>
        </el-submenu>
        
      </template>
    </el-menu>
    
  </div>
</template>

<script>
export default {
  data() {
     // console.log(this.$router.options.routes);
    return {
      isCollapse: false,
      routers: this.$router.options.routes,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
  #nav-wrap {
    position: fixed;
    width: $navMenu;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #344a5f;
  }
  
</style>