<template>
  <div>
    <Premium></Premium>
    <div class="userDetail">
      <el-card>ウーさんのマイページ</el-card>
      <el-tabs type="border-card" class="buyList">
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-shoucang3"></i> みたい</span>
          みたい
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-shoucang"></i> お気に入り映画館</span>
          お気に入り映画館
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-jifen"></i> ムビチケポイント</span>
          ムビチケポイント
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-goumaijilu"></i> 購入履歴</span>
          <el-descriptions v-for="item in ticketInfo[4]" :key="item[0]" class="margin-top" :column="3"
            style="margin-top: 20px;" border>
            <template slot="extra">
              <el-button type="primary" size="small">操作</el-button>
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="iconfont icon-dianying"></i>
                作品名
              </template>
              {{ movieName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="iconfont icon-calendar"></i>
                鑑賞日
              </template>
              {{ seeTime.mounth }}月{{ seeTime.day }}日 ({{ seeTime.week }}) {{ seeTime.start }}~{{ seeTime.end }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="iconfont icon-pingmubili1_1"></i>
                スクリーン
              </template>
              {{ screend }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                座席・券種
              </template>
              {{ item.name }}&nbsp;&nbsp;&nbsp;{{ item.ticketName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-money"></i>
                金額
              </template>
              {{ item.ticketMoney }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                劇場
              </template>
              HAL シネマズ
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Premium from '../components/myPremium.vue'
export default {
  name: 'myUser',
  data() {
    return {
      // 假设的数据
      ticketInfo: [],
      movieName: '',
      screend: '',
      seeTime: {}
    }
  },
  components: {
    Premium
  },
  methods: {
    getInfo() {
      // 假设的数据
      // const info = JSON.parse(localStorage.getItem('buyTicket'))
      // this.movieName = info.title
      // this.screend = info.screen
      // this.seeTime = info.date
      // this.ticketInfo = info
      // console.log(this.seeTime)
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style lang="less" scoped>
.userDetail {
  margin: auto;
  width: 80%;
  margin-top: 50px;
}

.buyList {
  margin-bottom: 100px;
}
</style>
