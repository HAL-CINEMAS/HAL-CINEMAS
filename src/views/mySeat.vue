<template>
  <div class="seat">
    <SeatNav :process="0"></SeatNav>
    <div class="seatContent">
      <p class="seatContentTop">お好きな座席をお選びください。</p>
      <div class="seatContentMiddle">
        <el-card class="seatContentLeft">
          <p class="leftTop">アイコン説明</p>
          <div class="leftTopEX">
            <div><i class="iconfont icon-zuowei"></i><span>空席（購入可能）</span></div>
            <div><i class="iconfont icon-zuowei" style="color: red;"></i><span>選択した席</span></div>
            <div>
              <i class="iconfont icon-zuowei1"></i><span>購入済み／販売対象外</span>
            </div>
            <div><i class="iconfont icon-kexuanzuobiankuang"></i><span>プレミアボックスシート</span></div>
          </div>
          <div class="leftMiddle">
            <SeatDetail></SeatDetail>
          </div>
        </el-card>
        <el-card class="seatContentRight">
          <p>作品</p>
          <h3>{{ this.ticketDetail[0] }}</h3>
          <p>日時</p>
          <h3>{{ this.ticketDetail[2] }}月{{ this.ticketDetail[3] }}日 ({{ this.ticketDetail[4] }})
            <br>
            {{ this.ticketDetail[5].start }}~{{ this.ticketDetail[5].end }}
          </h3>
          <p>劇場</p>
          <h3>HAL シネマ</h3>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import SeatNav from '../components/meSeatNav.vue'
import SeatDetail from '../components/mySeatDetail.vue'
export default {

  name: 'mySeat',
  data() {
    return {
      ticketDetail: []
    }
  },
  components: {
    SeatNav,
    SeatDetail
  },
  created() {
    const buyTicket = localStorage.getItem('buyTicket')
    this.ticketDetail = JSON.parse(buyTicket)
  }
}
</script>

<style lang="less" scoped>
.seat {
  margin: 0 auto;
  width: 80%;
  padding-bottom: 50px;

  .seatContent {
    margin: 0 auto;
    width: 90%;
    margin-top: 30px;

    .seatContentTop {
      font-size: 25px;
      font-weight: 400;
      margin-left: 15px;
    }

    .seatContentMiddle {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 90px;

      .seatContentLeft {
        width: 70%;
        background-color: #fff;
        // border: 1px solid #000;
        padding: 15px 10px;

        .leftTop {
          font-weight: 700;
          font-size: 15px;
        }

        .leftTopEX {
          margin-top: 15px;
          // width: 98%;
          height: 170px;
          border: 1px solid #bdbdbd;
          padding: 25px 0 0 25px;

          div {
            margin-bottom: 20px;
            display: inline-block;
            width: 50%;

            i {
              font-size: 23px;
              margin-right: 10px;
            }

            span {
              font-size: 18px;
            }
          }
        }

        .leftMiddle {
          display: flex;
          justify-content: center;

          .seatDetail {
            width: 350px;
            height: 450px;
            border: 1px solid #000;
          }
        }
      }

      .seatContentRight {
        width: 27%;
        height: 60%;

        p {
          font-size: 15px;
          color: #737373;
          margin-bottom: 5px;
        }

        h3 {
          margin-bottom: 20px;
          font-size: 16px;
        }
      }
    }
  }

}
</style>
