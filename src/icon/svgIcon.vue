<template>
  <div>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'svgIcon',
  props: ['iconClass', 'className'],
  // props: {
  //   iconClass: {
  //     type: String,
  //     default: '',
  //     required: true,
  //     validator: (value) => {
  //       return value
  //     }
  //   }
  // },
  data() {
    return {
      msg: 'fagaga'
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if(this.className) {
        return `svg-icon ${this.className}`
      }else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    // width: 24px;
    // text-align: center;
    // font-size: 18px;
    // margin-right: 5px;
    // vertical-align: middle;
  }
</style>