<template>
  <div id="layout">
    <layoutHeader></layoutHeader>
    <layoutMain></layoutMain>
    <layoutNav></layoutNav>
  </div>
</template>

<script>
import layoutHeader from './components/Header'
import layoutMain from './components/Main'
import layoutNav from './components/Nav'
export default {
  name: 'home',
  components: {
    layoutHeader,
    layoutMain,
    layoutNav
  }
}
</script>

<style lang="scss" scoped>
  #layout {
    background-color: #f7f7f7;
  }
</style>