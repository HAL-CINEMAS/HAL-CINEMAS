<template>
  <div>
    <el-card class="seatContentRight">
      <p>作品</p>
      <h3>{{ this.ticketDetail[0] }}</h3>
      <p>日時</p>
      <h3>{{ this.ticketDetail[2].mounth }}月{{ this.ticketDetail[2].day }}日 ({{ this.ticketDetail[2].week }})
        <br>
        {{ this.ticketDetail[2].start }}~{{ this.ticketDetail[2].end }}
      </h3>
      <p>スクリーン</p>
      <h3>{{ this.ticketDetail[1] }}</h3>
      <p>劇場</p>
      <h3>HAL シネマ</h3>
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
    const buyTicket = localStorage.getItem('buyTicket')
    this.ticketDetail = JSON.parse(buyTicket)
  }
}
</script>

<style lang="less">
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
}
</style>
