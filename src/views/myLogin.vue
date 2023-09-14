<template>
  <div class="login">
    <Premium></Premium>
    <div class="loginContent">
      <div class="contentTitle">HAL&nbsp;CINEMAS会員IDでログイン</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="'left'">
        <p class="formTitle">メールアドレスでログインする</p>
        <el-form-item prop="mail">
          <el-input v-model="ruleForm.mail" placeholder="メールアドレス"></el-input>
        </el-form-item>
        <el-form-item prop="ps">
          <el-input type="password" v-model="ruleForm.ps" placeholder="パスワード"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm('ruleForm')">ログインする
            <i class="el-icon-right button"></i>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="loginButtom">
        <p>はじめての方は、会員登録が必要です</p>
        <router-link to="/register" style="text-decoration: none;">
          <el-button type="primary" class="button">新規会員登録する(無料)<i class="el-icon-right"></i></el-button>
        </router-link>
        <h3>© HAL CINEMAS Co., Ltd. All Rights Reserved.</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Premium from '../components/myPremium.vue'
import app from '@/api/firebase.js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export default {
  name: 'myLogin',
  data() {
    return {
      ruleForm: {
        mail: '',
        ps: ''
      },
      rules: {
        mail: [
          { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ps: [
          { required: true, message: 'パスワードを入力してください', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      const auth = getAuth(app)
      const email = this.ruleForm.mail
      const password = this.ruleForm.ps
      console.log(email, password)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
          // ...
          this.$router.push('/user')
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)
        })
    }
  },
  components: {
    Premium
  }
}
</script>

<style lang="less" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap');

.login {
  background-color: #ffffff;
  height: 100%;

  .loginTop {
    padding: 10px 0 10px 45px;
    font-size: 20px;
    border-bottom: 1px solid #000000;
    font-family: 'Courier New', Courier, monospace;
  }

  .loginContent {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    .contentTitle {
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 2px;
      margin-top: 70px;

    }

    .el-form {
      margin-top: 50px;
      width: 25%;

      .formTitle {
        font-size: 12px;
        text-align: center;
        font-weight: 700;
        font-family: 'Noto Sans JP', sans-serif;
        margin-bottom: 10px;

      }

      /deep/.el-input__inner {
        border-radius: 5px;
        font-size: 14px;
      }

      .el-button {
        position: relative;
        background-color: #e81410;
        border: none;
        font-weight: 700;
        font-size: 13px;

        .button {
          position: absolute;
          right: 15px;
          font-size: 14px;
          font-weight: 700;
        }
      }

      .el-button:hover {
        background-color: #d00400;
      }
    }

  }

  .loginButtom {
    width: 100%;
    border-top: 1px solid #000;
    text-align: center;
    font-weight: 700;
    margin-top: 30px;

    p {
      font-size: 12px;
      margin-top: 80px;
      margin-bottom: 10px;
    }

    button {
      position: relative;
      background-color: #e81410;
      border: none;
      font-weight: 700;
      font-size: 13px;

      i {
        position: absolute;
        // right: 15px;
        font-size: 14px;
        font-weight: 700;
      }

    }

    .button:hover {
      background-color: #d00400;
    }

    h3 {
      font-size: 13px;
      color: #c92323;
      margin-top: 90px;
    }
  }

}
</style>
