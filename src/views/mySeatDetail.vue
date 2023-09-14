<template>
  <div class="seatContent">
    <div class="seaticon">
      <p class="leftTop">アイコン説明</p>
      <div class="leftTopEX">
        <div><i class="iconfont icon-zuowei"></i><span>空席（購入可能）</span></div>
        <div><i class="iconfont icon-zuowei" style="color: red;"></i><span>選択した席</span></div>
        <div>
          <i class="iconfont icon-zuowei1"></i><span>購入済み／販売対象外</span>
        </div>
        <div><i class="iconfont icon-kexuanzuobiankuang"></i><span>プレミアボックスシート</span></div>
      </div>
    </div>
    <div class="seatTop"
      :class="{ 'bcgImg1': screenFirst === 'L', 'bcgImg2': screenFirst === 'M', 'bcgImg3': screenFirst === 'S' }">
      <div class="screen"></div>
      <p class="screenName">スクリーン:<i>{{ this.screen }}</i></p>
      <div class="seatTr" v-for="(  row, rowIndex  ) in   seatGrid  " :key="rowIndex">
        <div class="seatTd" v-for="(  seat, columnIndex  ) in   row  " :key="columnIndex" :class="{
          'selected': seat.selected, 'add-style': (screenFirst === 'L' && (columnIndex === 3 || columnIndex === 15)) || (screenFirst === 'M' && (columnIndex === 1 || columnIndex === 9))
          //  'iconfont icon-zuowei1 icon-small': NoSelect.includes(seat.label)
        }
          ">
          <!-- 动态显示被购买的座位 -->
          <i v-if="seat.buy === false" class="iconfont icon-zuowei"
            v-on:click="!NoSelect.includes(seat.label) && selectSeat(rowIndex, columnIndex, seat)"></i>
          <!-- <i v-else-if="NoSelect.includes(seat.label)"></i> -->
          <i v-else disabled class="iconfont icon-zuowei1" style="pointer-events: none;" @click.stop></i>
        </div>
      </div>
    </div>
    <div class="seatBottom">
      <p class="equipmentTitle">映画館の設備</p>
      <p class="equipmentContent">
        <span class="left">座席表</span>
        <span class="right">設備・音響</span>
      </p>
      <p class="equipmentAmount">
        <span v-if="screenFirst === 'L'">200 席</span>
        <span v-else-if="screenFirst === 'M'">120 席</span>
        <span v-else-if="screenFirst === 'S'">70 席</span>
      </p>
    </div>
    <div class="submit">
      <div class="submitFront" :class="{ 'backColor': !backChange }" @click="ticketBuy">席を選択して次へ</div>
      <router-link to="/schedule" style="text-decoration: none;">
        <div class="submitBack">時間指定画面へ戻る</div>
      </router-link>
    </div>
    <div class="seatSelect">
      <div class="seatSelectC">
        <div class="seatSelectCleft">
          <div class="back">
            <ul>
              <li v-for="(  item, index  ) in   6  " :key="index"><img :src="getImg(index)" alt=""></li>
            </ul>
          </div>
          <span v-for="(  item, index  ) in   selected  " :key="index">
            {{ item }}
          </span>
        </div>
        <div class="seatSelectCright" @click="selectClear">解除</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seatGrid: [],
      screen: '',
      selected: [],
      screenFirst: '',
      isFirstLoad: true,
      NoSelect: []
    }
  },
  created() {
    // 根据传来的参数动态显示屏幕
    const buyTicket = JSON.parse(localStorage.getItem('buyTicket'))
    const buys = JSON.parse(localStorage.getItem('buys'))
    const buysTicket = []
    if (buys) {
      buys.forEach(item => {
        buysTicket.push(...item[3])
      })
    }

    this.NoSelect = buysTicket
    // console.log(this.NoSelect)
    this.screen = buyTicket[1]
    this.screenFirst = buyTicket[1][0]
    if (this.screenFirst === 'L') {
      this.generateSeatGrid(10, 20)
    } else if (this.screenFirst === 'M') {
      this.generateSeatGrid(10, 12)
    } else {
      this.generateSeatGrid(10, 7)
    }

    this.$store.commit('activeChange', 0)

    // localStorage.setItem('seat',)
  },
  methods: {
    // 动态生成座位
    generateSeatGrid(R, C) {
      const alphabet = 'ABCDEFGHIJ'

      for (let row = 0; row < R; row++) {
        const seatRow = []
        const rowLabel = alphabet[row]

        for (let column = 1; column <= C; column++) {
          const seatLabel = `${rowLabel}${column}`
          const isBuy = this.NoSelect.includes(seatLabel)
          seatRow.push({ row: rowLabel, column, label: seatLabel, selected: false, buy: isBuy })
        }
        // 将作为假设的放入本地
        this.seatGrid.push(seatRow)
      }
    },
    // 底部已选择的方法
    selectSeat(rowIndex, columnIndex, seat) {
      if (this.selected.length > 5 && !this.seatGrid[rowIndex][columnIndex].selected) {
        return alert('選択できる席は、6席までです。')
      }
      this.seatGrid[rowIndex][columnIndex].selected = !this.seatGrid[rowIndex][columnIndex].selected
      console.log(seat)
      // 点击座位显示在最底下
      if (this.seatGrid[rowIndex][columnIndex].selected) {
        this.selected.push(seat.label)
      } else if (!this.seatGrid[rowIndex][columnIndex].selected) {
        this.selected = this.selected.filter((value) => {
          return value !== seat.label
        })
      }
    },
    // 清楚选择座位
    selectClear() {
      this.selected = []
      this.seatGrid.forEach((item) => {
        item.forEach((item) => {
          item.selected = false
        })
      })
    },
    // 购买进入下一步
    ticketBuy() {
      if (this.selected.length === 0) return
      const buyTicket = JSON.parse(localStorage.getItem('buyTicket'))
      buyTicket[3] = this.selected
      localStorage.setItem('buyTicket', JSON.stringify(buyTicket))
      this.$router.push({
        name: 'ticket2'
      })
    }
  },
  computed: {
    getImg() {
      return (index) => {
        return this.selected[index] ? require('../assets/images/buy2.gif') : require('../assets/images/buy1.gif')
      }
    },
    backChange() {
      return this.selected.length === 0
    }
  }

}
</script>

<style lang="less" scoped>
.seatContent {
  display: flex;
  flex-direction: column;
  align-items: center;

  .seaticon {
    margin-bottom: 100px;
    font-size: 15px;

    p {
      font-weight: 700;
    }

    .leftTopEX {
      margin-top: 15px;
      height: 170px;
      border: 1px solid #bdbdbd;
      padding: 25px 0 0 25px;

      div {
        margin-bottom: 40px;
        display: inline-block;
        width: 50%;

        i {
          font-size: 23px;
          margin-right: 10px;
        }

        span {
          font-size: 17px;
        }
      }
    }
  }

  .screen {
    height: 13px;
    width: 60%;
    background-color: rgb(0, 0, 0);
    margin: 10px 0 10px 0;
  }

  .screenName {
    font-size: 16px;
    margin-bottom: 10px;

    i {
      color: red;
      font-weight: 700;
      font-style: normal;
    }
  }

  .seatTop {
    display: flex;
    width: 470px;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
    background-image: url(../assets/images/S1.jpg);
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  .bcgImg1 {
    background-image: url(../assets/images/L1.jpg);
  }

  .bcgImg2 {
    background-image: url(../assets/images/M1.jpg);
  }

  .bcgImg3 {
    background-image: url(../assets/images/S1.jpg);
  }

  .seatTr {
    margin: 0 auto;
    // border: 1px solod #000;
  }

  .seatTr,
  .seatTd {
    display: inline-block;
    font-size: 1.18em !important;
  }

  .seatTd {
    cursor: pointer;
    height: 21px;
  }

  .seatBottom {
    width: 80%;
    margin: 40px auto 0 auto;

    .equipmentTitle {
      font-weight: 700;
      font-size: 15px;
      color: #212121;
    }

    .equipmentContent {
      background-color: #9e9e9e;
      font-size: 14px;
      color: #fff;
      text-align: center;

      .left {
        width: 70%;
        display: inline-block;
        border-right: 2px solid #fff;
      }

      .right {
        display: inline-block;
        width: 30%;
      }
    }

    .equipmentAmount {
      padding: 10px 0 10px 0;
      border-bottom: 1px solid #bdbdbd;
      font-size: 16px;
      padding-left: 15px;
      color: #616161;
    }
  }

  .submit {
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    margin-top: 50px;

    .submitFront,
    .submitBack {
      width: 60%;
      margin: 0 auto;
      padding: 9px 0;
      text-align: center;
      border: 1px solid #bdbdbd;
      border-radius: 5px;
      font-family: Arial, Helvetica, sans-serif;
    }

    .submitFront {
      margin-bottom: 20px;
      background-color: #666666;
      color: #9a9a9a;

    }

    .backColor {
      background-color: #bb2828;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;

    }

    .backColor:hover {
      background-color: #fff;
      color: #b71c1c;
      border: 1px solid #b71c1c;
    }

    .submitBack {
      color: #626262;
      transition: all 0.3s;
      cursor: pointer;
    }

    .submitBack:hover {
      background-color: #666666;
      color: #fff;
    }

  }

  .seatSelect {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: rgba(0, 0, 0, .8);
    color: #000;

    .seatSelectC {
      div {
        float: left;
      }

      .seatSelectCleft {
        background-color: #ececec;
        height: 50px;
        width: 276px;
        margin-right: 10px;

        .back {
          height: 30px;

          ul {
            display: flex;
            margin-top: 5px;

            li {
              list-style-type: none;
              width: 46px;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 19px;
                height: 26px;
              }
            }
          }
        }

        span {
          display: inline-block;
          width: 46px;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          color: #b71c1c;
        }
      }

      .seatSelectCright {
        color: #000;
        background-color: #ffffff;
        height: 50px;
        width: 50px;
        border-radius: 4px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .seatSelectCright:hover {
        background-color: #666666;
        color: #fff;
      }
    }

  }

  /deep/.el-scrollbar {
    background-color: red;
  }

  .el-scrollbar__thumb {
    background-color: red;
  }

  .add-style {
    margin-right: 20px;
  }

}

.selected {
  color: red;
}

.disabled {
  background-color: yellow; // 将座位的背景色设为黄色
}

.icon-small {
  display: none;
}
</style>
