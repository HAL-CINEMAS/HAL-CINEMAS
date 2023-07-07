<template>
  <div class="seat">
    <SeatNav :process="getActive"></SeatNav>
    <div class="seatContent">
      <p>ご購入ありがとうございました。</p>
      <p>ご注文確認メールをご登録いただきましたメールアドレスに送りいらしましたので、ご確認ください。</p>
      <p>メールが届かない場合は、マイページのご注文履歴から状況を確認いただくことが可能です。</p>
      <div class="order"><span class="left">注文番号:</span><span class="right">230524851032</span></div>
      <!-- 添加前往个人主页 -->
      <div class="submit">
        <router-link to="/user" style="text-decoration: none;">
          <div class="right">マイページへ</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SeatNav from '../components/mySeatNav.vue'
export default {
  name: 'myPayend',
  created() {
    this.$store.commit('activeChange', 3)
  },
  computed: {
    getActive() {
      return this.$store.state.tab.active
    }
  },
  components: {
    SeatNav
  }
}
</script>

<style lang="less" scoped>
.seat {
  margin: 0 auto;
  width: 80%;
  padding-bottom: 50px;

  .seatContentTop {
    font-size: 25px;
    font-weight: 400;
    margin-left: 15px;
  }

  .seatContent {
    margin: 0 auto;
    width: 90%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin-bottom: 10px;
    }

    .order {
      margin-top: 20px;

      .left {
        font-size: 30px;
        font-weight: 700;
        margin-right: 20px;

      }

      .right {
        color: rgb(176, 5, 5);
        font-weight: 700;
      }
    }

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      width: 100%;
      margin-top: 50px;

      .right {
        width: 200px;
        margin: 0 auto;
        padding: 9px 0;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 5px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #bb2828;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
      }

      .right:hover {
        background-color: #fff;
        color: #b71c1c;
        border: 1px solid #b71c1c;
      }
    }

  }
}
</style>
