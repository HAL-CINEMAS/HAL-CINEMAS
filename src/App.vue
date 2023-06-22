<template>
  <router-view></router-view>
</template>

<script>
export default {

}
</script>

<style lang="less">
*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body,
html {
  height: 100%;
  overflow: hidden;
  padding-right: 0 !important;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
