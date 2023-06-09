<template>
  <div class="registerEnd">
    <h3>登録完了しました</h3>
    <div class="submit">
      <router-link to="/user" style="text-decoration: none;">
        <div class="right">マイページへ</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('registerActiveChange', 2)
  }
}
</script>

<style lang="less" scoped>
.registerEnd {
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
    color: #bb2828;
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
