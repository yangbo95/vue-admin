<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuStatus">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        {{username}}
      </div>
      <div><svg-icon class="header-icon pull-left" iconClass="logout" className="logout"></svg-icon></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.app.username
    }
  },
  methods: {
    navMenuStatus() {
      this.$store.commit('app/SET_COLLAPSE');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
  #header-wrap {
    position: fixed;
    top: 0;
    left: $navMenu;
    height: 75px;
    line-height: 75px;
    right: 0;
    background-color: #fff;
    @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,0.1));
    @include webkit(transition,all 0.5s ease 0s);
  }
  .open {
    #header-wrap {
      left: $navMenu;
    }
  }
  .close {
    #header-wrap {
      left: 64px;
    }
  }
  .header-icon {
    padding: 0 32px;
    cursor: pointer;
    
    svg {
      font-size: 25px;
      margin-bottom: -8px;
    }
  }
  .user-info {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    margin-right: 80px;
  }
  .pull-right {
    .header-icon {
      position: absolute;
      top: 27px;
      right: 0;
    }
  }
  
</style>