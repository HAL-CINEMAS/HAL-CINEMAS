<template>
  <div class="seatContent">
    <div class="screen"></div>
    <p class="screenName">スクリーン:<i>{{ this.screen }}</i></p>
    <div class="seatTr" v-for="(row, rowIndex) in seatGrid" :key="rowIndex">
      <div class="seatTd" v-for="(seat, columnIndex) in row" :key="columnIndex" :class="{ 'selected': seat.selected }"
        @click="selectSeat(rowIndex, columnIndex, seat)">
        <i class="iconfont icon-zuowei"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seatGrid: [],
      screen: ''
    }
  },
  created() {
    this.generateSeatGrid()
    const buyTicket = JSON.parse(localStorage.getItem('buyTicket'))
    this.screen = buyTicket[1]
  },
  methods: {
    generateSeatGrid() {
      const alphabet = 'ABCDEFGHIJ' // 10个英文字母，用于表示排数

      for (let row = 0; row < 10; row++) {
        const seatRow = []
        const rowLabel = alphabet[row] // 获取对应的英文字母标志

        for (let column = 1; column <= 20; column++) {
          const seatLabel = `${rowLabel}${column}` // 座位的标志，例如A1、B1等
          seatRow.push({ row: rowLabel, column, label: seatLabel, selected: false })
        }

        this.seatGrid.push(seatRow)
      }
    },
    selectSeat(rowIndex, columnIndex, seat) {
      this.seatGrid[rowIndex][columnIndex].selected = !this.seatGrid[rowIndex][columnIndex].selected
      console.log(rowIndex, columnIndex, seat.label)
    }
  }
}
</script>

<style lang="less" scoped>
.seatContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;

  .screen {
    height: 10px;
    width: 50%;
    background-color: rgb(0, 0, 0);
    margin: 10px 0 0 0;
  }

  .screenName {
    font-size: 16px;

    i {
      color: red;
      font-weight: 700;
      font-style: normal;
    }
  }

  .seatTr {
    margin: 0 auto;
  }

  .seatTr,
  .seatTd {
    display: inline-block;
    font-size: 19px !important;
  }

  .seatTr>.seatTd:nth-child(4) {
    color: red;
    margin-right: 10px;
  }

  .seatTr>.seatTd:nth-child(16) {
    color: red;
    margin-right: 10px;
  }

}

.selected {
  color: red;
}
</style>
