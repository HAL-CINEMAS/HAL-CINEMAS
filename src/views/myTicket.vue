<template>
  <div class="ticket">
    <div class="ticketContent" v-for="(item, index) in ticketList" :key="index">
      <div class="ticketContentL">
        <img src="../assets/images/buy2.gif" alt="">
        <span>{{ item.name }}</span>
      </div>
      <div class="ticketContentR">
        <div class="ticketItem" @click="ticketSelect(index)">
          <span v-if="item.click == false">券種を選択してください</span>
          <span v-else-if="item.click == true" class="ticketButton"><span>{{ item.ticketName }}</span><span>{{
            item.ticketMoney
          }}円</span></span>
        </div>
      </div>
    </div>
    <div class="ticketAmount">
      <span>合計</span>
      <span>{{ getTicketAcount }}円</span>
    </div>
    <div class="submit">
      <div class="submitFront" :class="{ 'backColor': backChange }" @click="toUserInfo">券種を選択して次へ</div>
      <router-link to="ticket1" style="text-decoration: none;">
        <div class="submitBack">戻る</div>
      </router-link>
    </div>
    <el-dialog title="券種を選択してください" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <div class="ticketItemC" v-for="(value, key) in ticketType" :key="key" @click="getTicketType(key, value)">
        <span>{{ key }}</span>
        <span>{{ value }}円</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'myTicket',
  data() {
    return {
      ticketList: [],
      dialogVisible: false,
      ticketType: { 一般: '1800', 大学生等: '1600', '中学, 高校': '1400', '小学生,幼児': '1000' },
      ticketChange: '',
      localStorageData: []
    }
  },
  methods: {
    ticketSelect(index) {
      this.dialogVisible = true
      this.ticketChange = index
    },
    handleClose() {
      this.dialogVisible = false
    },
    getTicketType(key, value) {
      this.ticketList.forEach((item, index) => {
        if (index === this.ticketChange) {
          item.click = true
          item.ticketName = key
          item.ticketMoney = value
        }
      })
      this.dialogVisible = false
    },
    toUserInfo() {
      const newArr = []
      this.ticketList.forEach((item) => {
        newArr.push(item)
      })
      this.localStorageData[4] = newArr
      this.localStorageData[5] = this.getTicketAcount
      localStorage.setItem('buyTicket', JSON.stringify(this.localStorageData))
      if (this.backChange === false) return
      this.$router.push({
        name: 'userinfo'
      })
    },
    createdR() {
      const buyTicket = JSON.parse(localStorage.getItem('buyTicket'))
      buyTicket[4] = []
      this.localStorageData = buyTicket
      const result = buyTicket[3].reduce((acc, item) => {
        acc.push({ name: item, click: false, ticketName: '', ticketMoney: 0 })
        return acc
      }, [])
      this.ticketList = result
      this.$store.commit('activeChange', 0)
    }
  },
  created() {
    this.createdR()
  },
  computed: {
    getTicketAcount() {
      return this.ticketList.reduce((accumulator, item) => accumulator + parseInt(item.ticketMoney), 0)
    },

    backChange() {
      const ticketAllSelect = this.ticketList.every(item => {
        return Object.keys(item.ticketName).length !== 0
      })
      return ticketAllSelect
    }
  }
}
</script>

<style lang="less" scoped>
.ticket {

  width: 100%;

  .ticketContent {
    display: flex;
    width: 800px;
    height: 150px;
    border: 1px solid #bababa;
    margin: 15px 10px;

    .ticketContentL {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      height: 100%;

      img {
        margin-right: 15px;
      }

      span {
        font-weight: 700;
        font-size: 20px;
      }
    }

    .ticketContentL::after {
      content: '';
      position: relative;
      right: -48px;
      width: 1px;
      height: 65%;
      background-color: #e0e0e0;
    }

    .ticketContentR {
      width: 70%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .ticketItem {
        width: 430px;
        height: 62px;
        text-align: center;
        line-height: 62px;
        background-color: #184fa5;
        color: #fff;
        font-weight: 700;
        border-radius: 5px;
        transition: all 0.3s;
        cursor: pointer;

        .ticketButton {
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          background-color: #fff;
          color: #0d47a1;
          border: 1px solid #bdbdbd;
          border-radius: 5px;
          transition: all 0.3s;
        }
      }

      .ticketButton:hover {
        color: #bb2828;
      }

      .ticketItem:hover {
        background-color: #bb2828;
      }
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

}

.el-dialog__wrapper {
  background-color: rgba(244, 244, 244, .5);

  /deep/.el-dialog {
    border-radius: 5px;
  }

  /deep/.el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.ticketItemC {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 60px;
  border-radius: 5px;
  border-top: 2px solid #bdbdbd;
  border-bottom: 2px solid #bdbdbd;
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
  padding: 0 15px;
  font-size: 15px;
  font-weight: 700;
  color: #0d47a1;
  transition: all 0.3s;
  cursor: pointer;
  margin-bottom: 10px;
}

.ticketItemC:hover {
  color: #b71c1c;
}

.ticketAmount {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  border-bottom: 1px solid #bdbdbd;

  span {
    font-size: 25px;
    font-weight: 700;
  }
}
</style>
