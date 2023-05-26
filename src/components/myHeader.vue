<template>
  <div class="header">
    <div class="menu" @click="menuChange">
      <i :class="!menuItem ? 'el-icon-close' : 'el-icon-menu'"></i>
      <span v-if="!getMenuChange">{{ '閉じる' }}&nbsp;&nbsp;&nbsp;</span>
      <span v-else>{{ 'メニュー' }}</span>
    </div>
    <div class="logo"><img src="../assets/images/logo1.png" alt=""><span>HAL <i>CINEMAS</i></span></div>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data() {
    return {
      menuItem: false
    }
  },
  methods: {
    menuChange() {
      this.$store.commit('isCollapseChange')
      this.menuItem = this.getMenuChange
      // console.log(this.menuItem)
    }
  },
  computed: {
    getMenuChange() {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #212121;
  height: 50px;
  padding: 0 10px;

  .menu {
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: all linear 0.15s;

    span {
      font-size: 5px;
      margin-left: 2px;
      font-weight: 700;
    }
  }

  .menu:hover {
    color: #a6a6a6;
  }

  .logo {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 15px;
    margin-left: 26px;

    img {
      width: 20px;
      height: 20px;
      margin-left: 26px;
    }

    span {
      font-size: 10px;
      font-weight: 700;
      margin-left: 5px;

      i {
        color: #d7102a;
      }
    }
  }
}
</style>
