<template>
  <div class="aside">
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#292929" text-color="#fff"
      active-text-color="#ffd04b" :collapse="getMenuChange">
      <el-menu-item :index="item.name" v-for="item in  menuData " :key="item.name" @click="menuLink(item)">
        <i :class="`${item.icon}`"></i>
        <span slot="title">{{ getUserid && item.name === 'login' ? 'マイページ' : item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'myAside',
  data() {
    return {
      isCollapse: false,
      menuData: [
        {
          path: '/home',
          name: 'home',
          label: 'トップページ',
          icon: 'el-icon-s-home'
        },
        {
          path: '/login',
          name: 'login',
          label: 'ログイン',
          icon: 'el-icon-user-solid'
        },
        {
          path: '/movie',
          name: 'movie',
          label: '作品を探す',
          icon: 'el-icon-film'
        },
        {
          path: '/allschedule',
          name: 'allschedule',
          label: 'スケジュール',
          icon: 'el-icon-video-camera-solid'
        },
        {
          path: '/cinemas',
          name: 'cinemas',
          label: '施設情報',
          icon: 'el-icon-s-finance'
        }
      ]
    }
  },
  methods: {
    menuLink(item) {
      if (item.path === this.$route.path) return
      if (item.path === '/login' && this.$route.path === '/user') return
      if (item.path === '/login' && this.getUserid) {
        this.$router.push({
          name: 'user'
        })
      } else { this.$router.push(item.path) }
    }
  },
  computed: {
    getMenuChange() {
      return this.$store.state.tab.isCollapse
    },
    getUserid() {
      return this.$store.state.tab.uid
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}

.aside {
  height: 100%;

  .el-menu {
    height: 100%;
    border-right: none;

    .el-menu-item {
      border-bottom: 1px solid #3f3f3f;
      color: #fff;

      i {
        color: #fff;
      }

      span {
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
}
</style>
