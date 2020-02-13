<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
  #main-wrap {
    // position: fixed;
    // left: $navMenu;
    // top: 75px;
    // right: 0;
    // bottom: 0;
    // box-sizing: border-box;
    // border: 30px solid #f7f7f7;
    // border-bottom: none;
    height: 100vh;
  }
  .main-content {
    width: 100%;
    height: 100%;
    padding-top: 105px;
    padding-left: $navMenu + 30;
    padding-right: 30px;
    box-sizing: border-box;
    @include webkit(transition,all 0.5s ease 0s);
    @include webkit(box-sizing,border-box);
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    box-sizing: border-box;
    @include webkit(box-sizing,border-box);
    background-color: #fff;
  }
  .open {
    .main-content {
      padding-left: $navMenu + 30;
    }
  }
  .close {
    .main-content {
      padding-left: 94px;
    }
  }
</style>