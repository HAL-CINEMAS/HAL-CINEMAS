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
          <span v-else-if="item.click == true">{{ item.ticketName }}{{ item.ticketMoney }}</span>
        </div>
      </div>
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
      ticketType: { 一般: '1,800', 大学生等: '1,600', '中学, 高校': '1,400', '小学生,幼児': '1,000' },
      ticketChange: '',
      ticketShow: ['', '', '', '']
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
      console.log(key, value, this.ticketChange)
      this.ticketList.forEach((item, index) => {
        if (index === this.ticketChange) {
          item.click = true
          item.ticketName = key
          item.ticketMoney = value
        }
      })
      this.dialogVisible = false
    }
  },
  created() {
    const buyTicket = JSON.parse(localStorage.getItem('buyTicket'))
    const result = buyTicket[3].reduce((acc, item) => {
      acc.push({ name: item, click: false, ticketName: '', ticketMoney: '' })
      return acc
    }, [])
    // console.log(result)
    this.ticketList = result
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
      }

      .ticketItem:hover {
        background-color: #bb2828;
      }
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
</style>
