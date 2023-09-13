<template>
  <div>
    <Premium></Premium>
    <div class="userDetail">
      <el-card>{{ userName }}さんのマイページ</el-card>
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
          <el-descriptions v-for="item in ticketInfo" :key="item.id" class="margin-top" :column="3"
            style="margin-top: 20px;" border>
            <!-- <template slot="extra">
              <el-button type="primary" size="small">操作</el-button>
            </template> -->
            <el-descriptions-item>
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
                <i class="el-icon-tickets"></i>
                座席・券種
              </template>
              <span v-for="(seat, index) in item.seat" :key="index">
                {{ seat }}
                <span v-if="index < item.seat.length - 1">, </span>
              </span>
              <!-- {{ item.name }}&nbsp;&nbsp;&nbsp;{{ item.ticketName }} -->
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
import app from '@/api/firebase.js'
import { getFirestore, getDoc, getDocs, doc, query, collection, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
  name: 'myUser',
  data() {
    return {
      // 假设的数据
      ticketInfo: [],
      movieName: '',
      screend: '',
      seeTime: {},
      userName: null
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
        console.log(QueryUsername.data().name)

        const QueryTicket = await getDocs(query(collection(db, 'ticket'), where('user', '==', userID)))
        console.log(QueryTicket)
        QueryTicket.forEach((doc) => {
          this.ticketInfo.push(doc.data())
        })
      } else {
        // user is dont login
        console.log('dont login')
      }
    })
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
