<template >
  <div class="seat">
    <SeatNav :process="0"></SeatNav>
    <div class="seatContent">
      <p class="seatContentTop">{{ this.message }}</p>
      <div class="seatContentMiddle">
        <el-card class="seatContentLeft">
          <div class="leftMiddle">
            <!-- 购票中间组件 -->
            <router-view></router-view>
          </div>
        </el-card>
        <SeatRight></SeatRight>
      </div>
    </div>
  </div>
</template>

<script>
import SeatNav from '../components/mySeatNav.vue'
import SeatRight from '../components/mySeatRight.vue'
export default {

  name: 'mySeat',
  data() {
    return {
      message: ''
    }
  },
  components: {
    SeatNav,
    SeatRight
  },
  methods: {
    updateMessage() {
      // 根据路由信息更新message
      const routeName = this.$route.name
      if (routeName === 'ticket1') {
        this.message = 'お好きな座席をお選びください。'
      } else if (routeName === 'ticket2') {
        this.message = 'チケットの種類をお選びください。'
      } else {
        this.message = '其他组件'
      }
    }

  },
  watch: {
    '$route'() {
      this.updateMessage()
    }
  },
  created() {
    this.updateMessage()
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
      margin-top: 10px;
      margin-bottom: 90px;

      .seatContentLeft {
        width: 70%;
        background-color: #fff;

        .leftTop {
          font-weight: 700;
          font-size: 15px;
        }

        .leftTopEX {
          margin-top: 15px;
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

          .seatDetail {
            width: 350px;
            height: 450px;
            border: 1px solid #000;
          }
        }
      }
    }
  }

}
</style>
