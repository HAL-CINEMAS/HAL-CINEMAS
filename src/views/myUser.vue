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
          <el-descriptions v-for="(item, index) in ticketInfo" :key="index" class="margin-top" :column="4"
            style="margin-top: 20px;" border direction="vertical">
            <template slot="extra">
              <span style="position: absolute; left: 20px;margin-top: 15px;">購入日時 : {{ item.timestamp }}</span>
              <el-button type="primary" size="small" @click="ticketdetail(item, index)">詳細</el-button>
            </template>
            <el-descriptions-item content-class-name="my-content">
              <template slot="label">
                <i class="iconfont icon-dianying"></i>
                作品名
              </template>
              {{ item.movie }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="iconfont icon-calendar"></i>
                鑑賞日
              </template>
              {{ item.date }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="iconfont icon-pingmubili1_1"></i>
                スクリーン
              </template>
              {{ item.screen }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                劇場
              </template>
              HAL シネマズ
            </el-descriptions-item>
          </el-descriptions>
          <el-pagination style="margin-top: 20px;" :page-size="20" :pager-count="11" layout="prev, pager, next"
            :total="1">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="チケット一覧" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-descriptions v-for="(item, index) in detail.seatType" :key="index" class="margin-top" :column="2"
        style="margin-top: 20px;" border>
        <el-descriptions-item content-class-name="my-seat">
          <template slot="label">
            <i class="el-icon-tickets"></i>
            座席・券種
          </template>
          {{ item.name }}&nbsp;&nbsp;・&nbsp;&nbsp;{{ seat[index].ticketName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            金額
          </template>
          {{ seat[index].ticketMoney }}円
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="2"
        style="margin-top: 20px;" border>
        <el-descriptions-item content-class-name="my-seat" :contentStyle="{'text-align': 'right','padding-right':'33px'}">
          <template slot="label" >
            <i class="el-icon-shopping-bag-2"></i>
            合計金額
          </template>
          {{ totalMoney }}円
        </el-descriptions-item>
      </el-descriptions>
      <!-- <div style="position: absolute; right: 50px; margin-top: 20px;" >合計:{{ totalMoney }}円</div> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Premium from '../components/myPremium.vue'
import app from '@/api/firebase.js'
import { getFirestore, getDoc, getDocs, doc, query, collection, where, orderBy } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
  name: 'myUser',
  data() {
    return {
      // 假设的数据
      ticketInfo: [],
      detail: [],
      seat: [],
      totalMoney: '',
      movieName: '',
      screend: '',
      seeTime: {},
      dialogVisible: false
    }
  },
  components: {
    Premium
  },
  mounted() {
    const auth = getAuth(app)
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const userID = user.uid
        const db = getFirestore(app)
        const QueryUsername = await getDoc(doc(db, 'user', userID))
        this.userName = QueryUsername.data().name
        // console.log(QueryUsername.data().name)

        const QueryTicket = await getDocs(query(collection(db, 'ticket'), where('user', '==', userID), orderBy('timestamp', 'asc')))
        // console.log(QueryTicket)
        QueryTicket.forEach((doc) => {
          this.ticketInfo.push(doc.data())
        })
        // this.seat = this.ticketInfo.seat
      } else {
        // user is dont login
        console.log('dont login')
      }
    })
    // console.log(this.ticketInfo)
  },
  methods: {
    // getInfo() {
    //   // 假设的数据
    //   const info = JSON.parse(localStorage.getItem('buys'))
    //   this.ticketInfo = info
    //   // console.log(this.ticketInfo)
    // },
    ticketdetail(e, index) {
      console.log(e)
      console.log(index)
      this.detail = e
      this.seat = e.seatType
      this.totalMoney = e.ticketMoney
      // console.log(this.totalMoney)
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  },
  created() {
    // this.getInfo()
  }
}
</script>

<style lang="less">
.userDetail {
  margin: auto;
  width: 80%;
  margin-top: 50px;
}

.buyList {
  margin-bottom: 100px;
}

.my-content {
  width: 500px
}

.my-seat {
  width: 200px;
}
</style>
