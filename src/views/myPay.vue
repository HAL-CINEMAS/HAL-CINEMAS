<template>
  <div class="seat">
    <SeatNav :process="getActive"></SeatNav>
    <div class="seatContent">
      <p class="seatContentTop">ご購入内容の確認</p>
      <el-card class="payContent">
        <div class="pay">
          <h3>ご購入内容</h3>
          <section>
            <h4>作品名</h4>
            <div class="detail">{{ buyTicket.title }}</div>
          </section>
          <section>
            <h4>劇場名</h4>
            <div class="detail">HAL シネマ</div>
          </section>
          <section>
            <h4>スクリーン</h4>
            <div class="detail">{{ buyTicket.screen }}</div>
          </section>
          <section>
            <h4>日時</h4>
            <div class="detail">{{ buyTicket.date.mounth }}月{{ buyTicket.date.day }}日 ({{
              buyTicket.date.week }}) {{ buyTicket.date.start }}~{{ buyTicket.date.end }}
            </div>
          </section>
          <section>
            <h4>座席・券種</h4>
            <div class="detail">
              <h4 class="ticket" v-for="item in  buyTicket.ticket " :key="item.name">
                <div class="left">{{ item.name }}</div>
                <div>{{ item.ticketName }}</div>
                <div>--{{ item.ticketMoney }}円</div>
              </h4>
            </div>
          </section>
        </div>
        <div class="pay">
          <h3>ご購入者情報</h3>
          <section>
            <h4>氏名</h4>
            <div class="detail">{{ userinfo.firstName }} &nbsp;&nbsp;{{ userinfo.name }}</div>
          </section>
          <section>
            <h4>氏名(フリガナ)</h4>
            <div class="detail">{{ userinfo.KfirstName }} &nbsp;&nbsp;{{ userinfo.KName }}</div>
          </section>
          <section>
            <h4>電話番号</h4>
            <div class="detail">{{ userinfo.phoneNum }}</div>
          </section>
          <section>
            <h4>メールアドレス</h4>
            <div class="detail">{{ userinfo.mail }}</div>
          </section>
        </div>
        <div class="pay">
          <h3>お支払い情報</h3>
          <section>
            <h4>注文合計</h4>
            <div class="detail">{{ buyTicket.account }}円</div>
          </section>
          <section>
            <h4>支払い方法</h4>
            <div class="detail">{{ userinfo.pay }}</div>
          </section>
        </div>
        <div class="submit">
          <router-link to="/seat/userinfo" style="text-decoration: none;">
            <div class="left">戻る</div>
          </router-link>
          <div @click='addticket' style="text-decoration: none;">
            <div class="right">購入を確認</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import SeatNav from '../components/mySeatNav.vue'
import app from '@/api/firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc, updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore'
const db = getFirestore(app)
export default {
  name: 'myPay',
  data() {
    return {
      movieContent: [],
      buyTicket: [],
      userinfo: {},
      loginid: 'null'
    }
  },
  created() {
    const storedData = JSON.parse(localStorage.getItem('movieData'))
    this.movieContent = (typeof this.$store.state.tab.movieList === 'object' && Object.keys(this.$store.state.tab.movieList).length === 0) ? storedData : this.$store.state.tab.movieList
    this.$store.commit('activeChange', 2)
    this.getbuyTicket()
  },
  mounted() {
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        this.loginid = uid
      } else {
        this.loginid = 'null'
        console.log('dont login')
      }
    })
  },
  methods: {
    getbuyTicket() {
      const buyTicket = JSON.parse(localStorage.getItem('buyTicket'))
      const userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.buyTicket = buyTicket
      this.userinfo = userinfo
      console.log(this.buyTicket)
    },

    addticket() {
      let date = this.buyTicket.date
      date = `${date.mounth}月${date.day}日 (${date.week}) ${date.start}~${date.end}`
      const day = ['日', '月', '火', '水', '木', '金', '土']
      let timestamp = new Date()
      timestamp = `${Number(timestamp.getMonth()) + 1}月${timestamp.getDate()}日 (${day[timestamp.getDay()]}) ${timestamp.getHours()}:${('0' + timestamp.getMinutes()).slice(-2)}`
      addDoc(collection(db, 'ticket'), {
        user: this.loginid,
        movie: this.buyTicket.title,
        screen: this.buyTicket.screen,
        seat: this.buyTicket.seatSelect,
        ticketMoney: this.buyTicket.account,
        cinema: 'HAL シネマズ',
        date: date,
        timestamp: timestamp
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      })
      setDoc(doc(db, 'seats', this.buyTicket.scheduleId))
      this.buyTicket.seatSelectNum.forEach(item => {
        updateDoc(doc(db, 'seats', this.buyTicket.scheduleId), {
          seat: arrayUnion(item)
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
      })
      this.$router.push('/payend')
    }
  },
  computed: {
    getActive() {
      return this.$store.state.tab.active
    }
  },
  components: {
    SeatNav
  }
}
</script>

<style lang="less" scoped>
.seat {
  margin: 0 auto;
  width: 80%;
  padding-bottom: 50px;

  // background-color: pink;
  .seatContentTop {
    font-size: 25px;
    font-weight: 400;
    margin-left: 15px;
  }

  .seatContent {
    margin: 0 auto;
    width: 75%;
    margin-top: 30px;

    .payContent {
      padding: 30px 0 0 0;
      margin-bottom: 60px;

      .pay {
        border-bottom: 1px solid #cccccc;
        padding: 0 0 20px 0;
        margin-bottom: 30px;

        section {
          display: flex;

          h4 {
            width: 200px;
            text-align: right;
          }

          h4 {
            margin-bottom: 12px;
            margin-right: 40px;
            font: inherit;
          }

          .detail {
            font-weight: 700;
          }

          .ticket {
            margin-bottom: 8px;
            text-align: left;
            width: 100%;

            div {
              display: inline-block;
            }

            .left {
              width: 30px;
              margin-right: 20px;
            }
          }
        }

        h3 {
          // width: 200px;
          width: 100%;
          text-align: center;
          margin-bottom: 45px;
          font-size: 18px;
          background-color: #666666;
          color: #fff;
        }
      }
    }

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      width: 100%;

      .left,
      .right {
        width: 200px;
        margin: 0 auto;
        padding: 9px 0;
        text-align: center;
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        font-family: Arial, Helvetica, sans-serif;
      }

      .left {
        margin-right: 20px;
        color: #000;
        transition: all 0.3s;
      }

      .left:hover {
        background-color: #666666;
        color: #fff;
      }

      .right {
        background-color: #bb2828;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
      }

      .right:hover {
        background-color: #fff;
        color: #b71c1c;
        border: 1px solid #b71c1c;
      }
    }
  }
}
</style>
