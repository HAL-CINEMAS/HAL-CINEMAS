<template>
  <div>
    <el-card class="seatContentRight">
      <p>作品</p>
      <h3>{{ ticketDetail[0] }}</h3>
      <p>日時</p>
      <h3>{{ ticketDetail[2].mounth }}月{{ ticketDetail[2].day }}日 ({{ ticketDetail[2].week }})
        <br>
        {{ ticketDetail[2].start }}~{{ ticketDetail[2].end }}
      </h3>
      <p>スクリーン</p>
      <h3>{{ ticketDetail[1] }}</h3>
      <p>座席・券種</p>

      <h3 v-if="ticketDetail[4] !== undefined">
        <h3 class="ticket" v-for="item in  ticketDetail[4] " :key="item.name">
          <div class="left">{{ item.name }}</div>
          <div>{{ item.ticketName }}</div>
          <div>/{{ item.ticketMoney }}円</div>
        </h3>
      </h3>
      <h3 v-else-if="ticketDetail[4] === undefined">
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
      const a = localStorage.getItem('buyTicket')
      this.ticketDetail = JSON.parse(a)
    }
  }
}
</script>

<style lang="less" scoped>
.seatContentRight {
  margin-left: 20px;
  width: 250px;

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
