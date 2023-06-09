<template>
  <div class="register">
    <Premium></Premium>
    <el-card class="registerContent">
      <h3 class="title">会員登録</h3>
      <el-steps :active="getregisterActive" simple>
        <el-step title="情報の入力"></el-step>
        <el-step title="情報の確認"></el-step>
        <el-step title="登録完了"></el-step>
      </el-steps>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import Premium from '../components/myPremium.vue'
export default {
  name: 'myRegister',
  data() {
    return {
      registerActive: ''
    }
  },
  components: {
    Premium
  },
  computed: {
    getregisterActive() {
      return this.$store.state.tab.registerActive
    }
  }
}
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

.register {
  width: 100%;

  .registerContent {
    margin: 100px auto 100px auto;
    width: 50%;
    // height: 500px;
    padding: 30px 50px;

    .title {
      margin-bottom: 20px;
      font-size: 25px;
      font-family: 'Noto Sans JP', sans-serif;
    }
  }
}

.el-steps {
  /deep/.el-step__icon.is-text {
    border: none;
    width: 0px;
  }

  /deep/.el-step__title.is-finish {
    color: #c0c4cc;
  }
}
</style>
