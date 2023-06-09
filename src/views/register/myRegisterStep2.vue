<template>
  <div class="registerDetail">
    <el-descriptions class="margin-top" :column="1" direction="vertical" border>
      <el-descriptions-item v-for="(item, index) in title" :key="index">
        <template slot="label">
          <i :class="getIconClass(item.icon)" class="icon"></i>
          {{ item.name }}
        </template>
        <span class="content">{{ reigisterInfo[item.user] }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="submit">
      <router-link to="/register/step1" style="text-decoration: none;">
        <div class="left">戻る</div>
      </router-link>
      <router-link to="/register/step3" style="text-decoration: none;">
        <div class="right">確認</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [{ name: 'メールアドレス', icon: 'youxiang', user: 'username' }, { name: 'パスワード', icon: 'xingming', user: 'pass' }, { name: 'ユーザー名', icon: 'ziyuanxhdpi', user: 'name' }, { name: '氏名', icon: 'zuoxixingming', user: 'mail' }, { name: '性別', icon: 'xingbie', user: 'sex' }, { name: '生年月日', icon: 'calendar', user: 'birth' }, { name: '都道府県', icon: 'dingwei', user: 'address' }, { name: '電話番号', icon: 'shouji', user: 'phone' }],
      reigisterInfo: []
    }
  },
  methods: {
    getIconClass(icon) {
      return `iconfont icon-${icon}`
    },

    getUserInfo() {
      const oldArr = JSON.parse(localStorage.getItem('register'))
      const birth = `${oldArr.year}-${oldArr.month}-${oldArr.day}`
      const newArr = { ...oldArr, birth: birth }
      this.reigisterInfo = newArr
      console.log(this.reigisterInfo)
    }
  },
  created() {
    this.$store.commit('registerActiveChange', 1)
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.registerDetail {
  margin-top: 50px;

  .content {
    font-weight: 700;
  }

  .icon {
    font-size: 20px;
    color: #000;
  }

  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    width: 100%;

    .left,
    .right {
      width: 200px;
      margin: 0 auto;
      padding: 9px 0;
      text-align: center;
      border: 1px solid #bdbdbd;
      border-radius: 5px;
      font-family: Arial, Helvetica, sans-serif;
    }

    .left {
      margin-right: 20px;
      color: #000;
      transition: all 0.3s;
    }

    .left:hover {
      background-color: #666666;
      color: #fff;
    }

    .right {
      background-color: #bb2828;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      border: none;
    }

    .right:hover {
      background-color: #fff;
      color: #b71c1c;
      border: 1px solid #b71c1c;
    }
  }
}
</style>
