<template>
  <div class="registerDetail">
    <el-descriptions class="margin-top" :column="1" direction="vertical" border>
      <el-descriptions-item v-for="(item, index) in title" :key="index">
        <template slot="label">
          <i :class="getIconClass(item.icon)" class="icon"></i>
          {{ item.name }}
        </template>
        <span class="content">{{ registerInfo[item.user] }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="submit">
      <router-link to="/register/step1" style="text-decoration: none;">
        <div class="left">戻る</div>
      </router-link>
      <div @click='adduser' style="text-decoration: none;">
        <div class="right">確認</div>
      </div>
    </div>
  </div>
</template>

<script>
import app from '@/api/firebase.js'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore'

export default {
  data() {
    return {
      title: [{ name: 'メールアドレス', icon: 'youxiang', user: 'username' }, { name: 'ユーザー名', icon: 'ziyuanxhdpi', user: 'name' }, { name: '氏名', icon: 'zuoxixingming', user: 'mail' }, { name: '性別', icon: 'xingbie', user: 'sex' }, { name: '生年月日', icon: 'calendar', user: 'birth' }, { name: '都道府県', icon: 'dingwei', user: 'address' }, { name: '電話番号', icon: 'shouji', user: 'phone' }],
      registerInfo: []
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
      this.registerInfo = newArr
    },

    adduser() {
      const data = this.registerInfo
      let auth = getAuth(app)
      const db = getFirestore(app)
      auth = getAuth()
      createUserWithEmailAndPassword(auth, data.mail, 'this.registerInfo.pass').then((userCredential) => {
        setDoc(doc(db, 'user', userCredential.user.uid), {
          name: data.username,
          phone: data.phone,
          birth: Timestamp.fromDate(new Date(data.year, data.month - 1, data.day)),
          address: data.address,
          sex: data.sex,
          timestamp: serverTimestamp()
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
        this.$router.push('/register/step3')
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      })
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
