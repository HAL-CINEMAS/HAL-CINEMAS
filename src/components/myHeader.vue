<template>
  <div class="header">
    <div class="menu" @click="menuChange">
      <i :class="!menuItem ? 'el-icon-close' : 'el-icon-menu'"></i>
      <span v-if="!getMenuChange">{{ '閉じる' }}&nbsp;&nbsp;&nbsp;</span>
      <span v-else>{{ 'メニュー' }}</span>
    </div>
    <div class="logo"><img src="../assets/images/logo1.png" alt=""><span>HAL <i>CINEMAS</i></span></div>
    <div class="login">
      <el-dropdown @command="userAction" :hide-timeout="200">
        <span class="el-dropdown-link">
          menu
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">マイページ</el-dropdown-item>
          <el-dropdown-item command="b">{{ loginid }}</el-dropdown-item>
          <el-dropdown-item command="c">XXX</el-dropdown-item>
          <el-dropdown-item command="d">XXX</el-dropdown-item>
          <el-dropdown-item command="e">ログアウト</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import app from '@/api/firebase.js'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
  name: 'myHeader',
  data() {
    return {
      menuItem: false,
      loginid: 'null'
    }
  },
  mounted() {
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.email
        this.loginid = uid
        this.$store.commit('useridSave', uid)
      } else {
        this.loginid = 'ログイン'
        console.log('dont login')
      }
    })
  },
  methods: {
    menuChange() {
      this.$store.commit('isCollapseChange')
      this.menuItem = this.getMenuChange
    },
    userAction(item) {
      if (item === 'a') {
        if (this.$route.name === 'user') return
        if (this.$store.state.tab.uid === false && this.$route.path === '/login') return
        if (this.$store.state.tab.uid === false && this.$route.path !== '/login') {
          this.$router.push({
            name: 'login'
          })
        } else {
          this.$router.push({
            name: 'user'
          })
        }
      } else if (item === 'e') {
        if (this.$store.state.tab.uid === false) return
        this.logout()
      }
    },
    // ログアウト機能
    logout() {
      const auth = getAuth(app)
      signOut(auth)
        .then(() => {
          this.$store.commit('useridSave', '')
          if (this.$route.path === '/home') return
          this.$router.push({
            name: 'home'
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
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

  .login {
    margin-left: auto;
    margin-right: 20px;
  }

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

  .el-dropdown {
    color: #fff;
  }
}
</style>
