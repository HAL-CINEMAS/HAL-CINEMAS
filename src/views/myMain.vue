<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <!-- <button @click="test">按钮</button> -->
        <el-scrollbar style="height: 100%;" ref="scrollbar">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/myHeader.vue'
import Aside from '../components/myAside.vue'
export default {
  components: {
    Header,
    Aside
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.$refs.scrollbar.wrap.scrollTop = 0

      next()
    })
  }

}
</script>

<style lang="less">
.el-container {
  height: 100%;
}

.el-header {
  padding: 0;
  height: 50px !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

  /deep/.el-menu {
    .title {
      text-align: center;
      color: #fff;
    }
  }
}

.el-main {
  padding: 0;
  background-color: #f5f5f5;
  height: 100%;
  // overflow: hidden;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
