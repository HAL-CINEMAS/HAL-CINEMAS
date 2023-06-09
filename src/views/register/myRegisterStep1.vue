<template>
  <div class="step1">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm"
      label-position="left">
      <el-form-item label="メールアドレス" prop="mail">
        <el-input v-model="ruleForm.mail"></el-input>
        <p>設定後の変更は出来ません。</p>
      </el-form-item>
      <el-form-item label="ユーザー名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="氏名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性別" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男" value="1"></el-radio>
          <el-radio label="女" value="0"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生年月日" required>
        <el-form-item prop="year" required style="display: inline-block; width:20%;">
          <el-select v-model="ruleForm.year" placeholder="0000" style="width: 80%;">
            <el-option label="1995" value="1995"></el-option>
            <el-option label="1996" value="1996"></el-option>
          </el-select>
          <i class="little"> 年</i>
        </el-form-item>
        <el-form-item prop="month" required style="display: inline-block;width:20%;">
          <el-select v-model="ruleForm.month" placeholder="00" style="width: 65%;">
            <el-option label="01" value="01"></el-option>
            <el-option label="02" value="02"></el-option>
          </el-select>
          <i class="little"> 月</i>
        </el-form-item>
        <el-form-item prop="day" required style="display: inline-block;width:20%;">
          <el-select v-model="ruleForm.day" placeholder="00" style="width: 65%;">
            <el-option label="01" value="01"></el-option>
            <el-option label="02" value="02"></el-option>
          </el-select>
          <i class="little"> 日</i>
        </el-form-item>
      </el-form-item>
      <el-form-item label="都道府県" prop="address">
        <el-select v-model="ruleForm.address" placeholder="選択する" style="width: 40%;">
          <el-option label="愛知県" value="愛知県"></el-option>
          <el-option label="富山県" value="富山県"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="電話番号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
        <p>ムビチケ購入時に使用します</p>
      </el-form-item>
      <div class="submitBottom">
        <el-button class="submit" @click="submitForm('ruleForm')">入力内容を確認する<span
            class="el-icon-right arrow"></span></el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        mail: '',
        username: '',
        name: '',
        sex: '',
        year: '',
        month: '',
        day: '',
        address: '',
        phone: ''
      },
      rules: {
        mail: [
          { required: true, message: 'メールアドレスを入力してください。', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'ユーザー名を入力してください。', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '氏名を入力してください。', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性別を選択してください。', trigger: 'blur' }
        ],
        year: [
          { required: true, message: '年を選択してください。', trigger: 'blur' }
        ],
        month: [
          { required: true, message: '月を選択してください。', trigger: 'blur' }
        ],
        day: [
          { required: true, message: '日を選択してください。', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '都道府県を選択してください。', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '電話番号を入力してください。', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          localStorage.setItem('register', JSON.stringify(this.ruleForm))
          this.$router.push({
            name: 'step2'
          })
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.$store.commit('registerActiveChange', 0)
  }
}
</script>

<style lang="less" scoped>
.step1 {
  .el-form {
    margin-top: 40px;

    /deep/.el-form-item__label {
      font-weight: 700;
      font-size: 15px;
      color: #000;
    }

    /deep/.el-form-item {
      margin-bottom: 30px;
    }

    /deep/.el-select .el-input .el-select__caret {
      color: red;
      font-weight: 700;
      font-size: 15px;
    }

    p {
      font-weight: 700;
      color: #7b7b90;
    }

    .submitBottom {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .submit {
      position: relative;
      background-color: #e71410;
      color: #fff;
      font-weight: 700;
      width: 60%;
      font-size: 15px;
      padding: 14px 0px;
      margin: 0 auto;
      transition: all 0.3s;

      .arrow {
        position: absolute;
        right: 15px;
        font-weight: 700;
      }
    }

    .submit:hover {
      border: 1px solid #e71410;
      background-color: #fff;
      color: #e71410;
    }
  }
}
</style>
