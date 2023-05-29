<template>
  <div class="seat">
    <el-steps :active="process">
      <el-step title="STEP1:" description="座席・チケット選択"></el-step>
      <el-step title="STEP2:" description="ご購入者情報の入力"></el-step>
      <el-step title="STEP3:" description="お支払い情報の入力"></el-step>
      <el-step title="STEP4:" description="購入内容の確認"></el-step>
      <el-step title="STEP5:" description="購入完了"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'mySeat',
  data() {
    return {
      active: {}
    }
  },
  props: ['process'],

  created() {
    const buyTicket = localStorage.getItem('buyTicket')
    this.ticketDetail = buyTicket
  }
}
</script>

<style lang="less" scoped>
.seat {
  border-bottom: 1px solid #e0e0e0;
  padding: 0 0 10px 0;

  .el-steps {
    margin: 30px 0 0 0;

    /deep/.el-step__title {
      font-size: 13px;
      line-height: 20px;
    }

    /deep/.el-step__title.is-process,
    /deep/.el-step__description.is-process {
      color: #b71c1c;
    }

    /deep/.el-step__head.is-process {
      color: #b71c1c;
      border-color: #b71c1c;
    }

    /deep/.el-step__head.is-finish {
      color: #c0c4cc;
      border-color: #c0c4cc;
    }

    /deep/.el-step__title.is-finish {
      color: #c0c4cc;
    }

    /deep/.el-step__description.is-finish {
      color: #c0c4cc;
    }
  }
}
</style>
