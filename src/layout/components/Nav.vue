<template>
  <div id="nav-wrap">
    <div class="logo">
      <img height="100" src="../../assets/system.png" alt="">
    </div>
    <el-menu default-active="1-4-1" background-color="transparent" 
      class="el-menu-vertical-demo" :collapse="IsCollapse" text-color="#fff" active-text-color="#fff" :router="true">

      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id"  :index="index+''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i class="el-icon-help"></i> -->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
            <span slot="title" class="title-route">{{ item.meta.title }}</span>
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
     // console.log(this.$store.state.isCollapse);
    return {
      isCollapse: false,
      routers: this.$router.options.routes,
    };
  },
  computed: {
    IsCollapse() {
      return this.$store.state.app.isCollapse;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
  .logo{
    @include webkit(transition,all 0.3s ease 0s);
    img {
      margin-top: 20px;
      margin-left: 70px;
      
    }
  }
  #nav-wrap {
    position: fixed;
    width: $navMenu;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #344a5f;
    @include webkit(transition,all 0.5s ease 0s);
  }
  .title-route {
    position: absolute;
    top: 1px;
    left: 50px;
  }
  .el-menu {
    width: $navMenu;
    border-right: none;
  }
  .open {
    #nav-wrap {
      width: $navMenu;
    }
  }
  .close {
    #nav-wrap {
      width: 64px;
      .logo {
        transform: scaleX(0)
      }
      .el-submenu {
        width: 64px;
      }
    }
  }
</style>