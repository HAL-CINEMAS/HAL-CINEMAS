<template>
  <div>
    <el-card class="seatContentRight">
      <p>作品</p>
      <h3>{{ ticketDetail.title }}</h3>
      <p>日時</p>
      <h3>{{ ticketDetail.date.mounth }}月{{ ticketDetail.date.day }}日 ({{ ticketDetail.date.week }})
        <br>
        {{ ticketDetail.date.start }}~{{ ticketDetail.date.end }}
      </h3>
      <p>スクリーン</p>
      <h3>{{ ticketDetail.screen }}</h3>
      <p>座席・券種</p>

      <h3 v-if="ticketDetail.ticket !== undefined">
        <h3 class="ticket" v-for="item in  ticketDetail.ticket " :key="item.name">
          <div class="left">{{ item.name }}</div>
          <div>{{ item.ticketName }}</div>
          <div>/{{ item.ticketMoney }}円</div>
        </h3>
      </h3>
      <h3 v-else-if="ticketDetail.ticket === undefined">
        <br>
      </h3>

      <p>劇場</p>
      <h3>HAL シネマズ</h3>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'mySeatRight',
  data() {
    return {
      ticketDetail: []
    }
  },
  created() {
    this.buyTicket()
  },
  methods: {
    buyTicket() {
      const ticketData = localStorage.getItem('buyTicket')
      this.ticketDetail = JSON.parse(ticketData)
      // console.log(this.ticketDetail)
    }
  }
}
</script>

<style lang="less" scoped>
.seatContentRight {
  margin-left: 20px;

  p {
    font-size: 15px;
    color: #737373;
    margin-bottom: 5px;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .ticket {
    margin-bottom: 8px;

    div {
      display: inline-block;
    }

    .left {
      width: 30px;

      margin-right: 20px;
    }
  }
}
</style>
