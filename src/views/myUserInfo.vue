<template>
  <div class="userinfo">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
      label-position="top">
      <div class="title">お名前<span>（※必須項目）</span></div>
      <el-form-item label="漢字(姓)" prop="firstName">
        <el-input v-model="ruleForm.firstName"></el-input>
      </el-form-item>
      <el-form-item label="漢字(名)" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="フリガナ(姓)" prop="KfirstName">
        <el-input v-model="ruleForm.KfirstName"></el-input>
      </el-form-item>
      <el-form-item label="フリガナ(名)" prop="KName">
        <el-input v-model="ruleForm.KName"></el-input>
      </el-form-item>
      <div class="title">お電話番号<span>（※必須項目）</span></div>
      <el-form-item label="半角数字・ハイフンなし" prop="phoneNum">
        <el-input v-model="ruleForm.phoneNum"></el-input>
      </el-form-item>
      <div class="title">メールアドレス<span>（※必須項目）</span></div>
      <el-form-item label="PC・スマートフォン" prop="mail">
        <el-input v-model="ruleForm.mail"></el-input>
      </el-form-item>
      <div class="title">お支払い方法<span>（※必須項目）</span></div>
      <el-form-item label="">
        <el-form-item prop="pay">
          <el-radio-group v-model="ruleForm.pay" size="medium">
            <el-radio label="クレジットカード"></el-radio>
            <el-radio label="PayPay"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')">次へ</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'muUseringo',
  data() {
    return {
      ruleForm: {
        firstName: '',
        name: '',
        KfirstName: '',
        KName: '',
        phoneNum: '',
        mail: '',
        pay: ''
      },
      rules: {
        firstName: [
          { required: true, message: '必須項目です', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必須項目です', trigger: 'blur' }
        ],
        KfirstName: [
          { required: true, message: '必須項目です', trigger: 'blur' }
        ],
        KName: [
          { required: true, message: '必須項目です', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '必須項目です', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '必須項目です', trigger: 'blur' }
        ],
        pay: [
          { required: true, message: '必須項目です', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // }
  },
  created() {
    this.$store.commit('activeChange', 1)
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    width: 100%;
    height: 60px;
    background-color: #4f4f4f;
    color: #ffffff;
    font-size: 18px;
    line-height: 60px;
    padding-left: 20px;
    margin-bottom: 20px;

    span {
      font-size: 14px;
    }
  }

  .el-form {
    width: 80%;

    .el-form-item {
      /deep/.el-form-item__label {
        padding: 0;
        line-height: 30px;
        font-size: 15px;
      }
    }

    .submit {
      width: 477px;
      height: 60px;
      background-color: #ba2727;
      border: none;
      font-size: 19px;
      color: #fff;
      font-weight: 700;
      transition: all 0.3s;
    }

    .submit:hover {
      color: #b71c1c;
      border: 1px solid #b71c1c;
      background-color: #fff;
    }

    .bottom {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 35px;

    }

  }
}
</style>
