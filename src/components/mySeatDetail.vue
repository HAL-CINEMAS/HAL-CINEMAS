<template>
  <div class="seatContent">
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
      num1: 4,
      num2: 16
    }
  },
  created() {
    this.generateSeatGrid()
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

  .seatTr {
    margin: 0 auto;
  }

  .seatTr,
  .seatTd {
    display: inline-block;
    font-size: 19px;
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
