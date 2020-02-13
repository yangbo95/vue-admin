<template>
    <div class="content">
        <h1>Viewer图片预览插件</h1>
        <viewer :images="imgs">
            <img v-for="src in imgs" :src="src.url" :key="src.title">
        </viewer>
   </div>
</template>
<script>
export default {
  data () {
    return {
      imgs: [
       {
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
          title: '图片1'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg',
          title: '图片2'
        }
      ]
    }
  },
}
</script>