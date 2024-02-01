<template>
  <div class="movie">
    <div class="movieTop">
      <div class="movieTitle">
        {{ this.movieContent.title }}
      </div>
      <div class="movieContent">
        <div class="movieContentLeft">
          <img :src="require(`../assets/images/${this.movieContent.img}`)" alt="">
        </div>
        <div class="movieContentRight">
          <h3 class="subTitle">{{ this.movieContent.subtitle }}</h3>
          <p><span>公開</span>{{ this.movieContent.data }}</p>
          <p><span>監督</span>{{ this.movieContent.regulator }}</p>
          <p><span>出演</span><br>{{ this.movieContent.performers }}</p>
          <p>
            <span>解説</span><br>{{ this.movieContent.explain }}
          </p>
        </div>
      </div>
    </div>
    <div class="movieMiddle">
      <div class="scheduleTitle"><span>上映スケジュール</span></div>
      <div class="movieTop">
        <h3><span>上映中の劇場一覧</span><span>Theater List In Screening</span></h3>
      </div>
      <div class="scheduleContent">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" ref="myTabs">
          <el-tab-pane label="中部" name="1">
            <div class="scheduleItem">
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <div style="width: 100%;padding-bottom: 10px;border-bottom: 1px solid #bdbdbd;" @click="show">
                      <p class="city">[名古屋市]</p>
                      <p class="cinemas">HALシネマズ</p>
                    </div>
                  </template>
                  <div class="times">
                    <div class="timesTop">
                      <i class="el-icon-caret-left leftRight" @click="moveLeft" :disabled="leftButtonDisabled"></i>
                      <div class="content">
                        <span class="times" v-for="(item, index) in displayedItems" :key="index"
                          :class="{ active: activeIndex === index }" @click="changeColor(item, index)" ref="timess">
                          <span class="months">
                            {{ getLeftPart(item) }}
                          </span>/
                          <span class="days">{{ getRightPart(item) }}</span>
                          <span style="font-size: 15px;">({{ getWeekday(item) }})</span>
                        </span>
                      </div>
                      <i class="el-icon-caret-right leftRight" @click="moveRight" :disabled="rightButtonDisabled"></i>
                    </div>
                    <div class="timesContent" v-if="selectedDate">
                      <p>{{ getLeftPart(this.selectedDate) }}月{{ getRightPart(this.selectedDate) }}日({{
                        getWeekday(this.selectedDate) }})</p>
                      <h3>{{ this.movieContent.title }}</h3>
                      <div class="screen" v-for="(item, index) in screen" :key="index">
                        <p class="screenTop"><i>{{ item.size }}</i> SCREEN{{ item.num }}</p>
                        <div class="screenContent" v-for="(detail, index) in item.times" :key="index"
                          @click="buyTicket(detail, item)">
                          <i class="startTime">{{ detail.start }}</i>
                          <i class="endTime">~&nbsp;&nbsp;&nbsp;{{ detail.end }}</i>
                          <i class="selling"><i class="el-icon-sunny">&nbsp;</i>販売中</i>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="東北" name="2">東北(お楽しみに)</el-tab-pane>
          <el-tab-pane label="関東" name="3">関東(お楽しみに)</el-tab-pane>
          <el-tab-pane label="関西" name="4">関西(お楽しみに)</el-tab-pane>
          <el-tab-pane label="中国" name="5">中国(お楽しみに)</el-tab-pane>
          <el-tab-pane label="四国" name="6">四国(お楽しみに)</el-tab-pane>
          <el-tab-pane label="九州" name="7">九州(お楽しみに)</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="movieBottom">
      <div>上映中作品一覧はこちら</div>
      <div>公開予定作品一覧はこちら</div>
    </div>
  </div>
</template>

<script>
import { getFirestore, getDocs, collection, query } from 'firebase/firestore'
import app from '@/api/firebase.js'
export default {
  name: 'mySchedule',
  data() {
    return {
      movieContent: {
      },
      scheduleList: [
        { id: 1, name: '東北' }
      ],
      activeName: 'first',
      activeNameSub: 'first',
      activeNames: [''],
      items: [],
      displayStartIndex: 0,
      displayEndIndex: 6,
      startDate: new Date(),
      activeIndex: null,
      selectedDate: null, // 选中时间段
      data: null,
      screen: [
      ],
      user: 1 // 假设用户是否登入 1为已登入 2为未登入
    }
  },
  methods: {
    handleClick(tab, event) {

    },
    handleClickSub(tab, event) {

    },
    handleChange(val) {

    },
    handleScroll() {
      console.log('a')
    },

    // 选择的具体信息
    buyTicket(e, item) {
      if (this.$store.state.tab.uid) {
        // 选中时间
        const time = e
        const size = item.num
        const mounth = this.getLeftPart(this.selectedDate)
        const day = this.getRightPart(this.selectedDate)
        const week = this.getWeekday(this.selectedDate)
        const obj = { mounth, day, week, ...time }
        const buyDetail = JSON.stringify([this.movieContent.title, size, obj])
        localStorage.setItem('buyTicket', buyDetail)
        this.$router.push({
          name: 'seat'
        })
      } else {
        alert('ログインしてください')
        this.$router.push({
          name: 'login'
        })
      }
    },
    // 进来自动点击
    show() {
      this.$nextTick(() => {
        const spanElement = this.$refs.timess[0]
        spanElement.dispatchEvent(new Event('click'))
      })
    },
    // 向左一天
    moveLeft() {
      if (this.displayStartIndex > 0) {
        this.displayStartIndex--
        this.displayEndIndex--
      }
    },
    // 向右一天
    moveRight() {
      if (this.displayEndIndex < this.items.length - 1) {
        this.displayStartIndex++
        this.displayEndIndex++
      }
    },

    // 获得时间的月和日
    getLeftPart(date) {
      return date.split('/')[0] // 拆分日期，获取左边部分
    },
    getRightPart(date) {
      return date.split('/')[1] // 拆分日期，获取右边部分
    },
    // 获得星期值
    getWeekday(date) {
      const weekdays = ['土', '日', '月', '火', '水', '木', '金']
      const dateObject = new Date(date)
      const weekdayIndex = dateObject.getDay()
      return weekdays[weekdayIndex]
    },
    // 点击时间时高亮
    changeColor(item, index) {
      this.activeIndex = index
      this.selectedDate = item
      console.log(this.selectedDate)
      this.firebase()
      // console.log(this.screen)
    },
    async firebase() {
      this.screen = []
      const screenTemp = { L1: [], L2: [], L3: [], M1: [], M2: [], S1: [], S2: [], S3: [] }
      const db = getFirestore(app)
      const querySnapshot = await getDocs(query(collection(db, 'schedule')))
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        console.log(this.movieContent.id)
        if (this.movieContent.id === doc.data().movie_id) {
          // if()
          doc.data().data.forEach((item) => {
            // 排序判断每个时间是否一样
            if ((this.convertToShortDate(item.day) === this.selectedDate)) {
              const S = item.date
              const E = item.end
              const Sr = this.removeSeconds(S)
              const Er = this.removeSeconds(E)
              if (item.screen === 'L1') { screenTemp.L1.push({ start: Sr, end: Er }) }
              if (item.screen === 'L2') { screenTemp.L2.push({ start: Sr, end: Er }) }
              if (item.screen === 'L3') { screenTemp.L3.push({ start: Sr, end: Er }) }
              if (item.screen === 'M1') { screenTemp.M1.push({ start: Sr, end: Er }) }
              if (item.screen === 'M2') { screenTemp.M2.push({ start: Sr, end: Er }) }
              if (item.screen === 'S1') { screenTemp.S1.push({ start: Sr, end: Er }) }
              if (item.screen === 'S2') { screenTemp.S2.push({ start: Sr, end: Er }) }
              if (item.screen === 'S3') { screenTemp.S3.push({ start: Sr, end: Er }) }
            }
          })
        }
      })
      if (screenTemp.L1.length !== 0) { this.screen.push({ num: 'L1', size: '大', times: screenTemp.L1 }) }
      if (screenTemp.L2.length !== 0) { this.screen.push({ num: 'L2', size: '大', times: screenTemp.L2 }) }
      if (screenTemp.L3.length !== 0) { this.screen.push({ num: 'L3', size: '大', times: screenTemp.L3 }) }
      if (screenTemp.M1.length !== 0) { this.screen.push({ num: 'M1', size: '中', times: screenTemp.M1 }) }
      if (screenTemp.M2.length !== 0) { this.screen.push({ num: 'M2', size: '中', times: screenTemp.M2 }) }
      if (screenTemp.S1.length !== 0) { this.screen.push({ num: 'S1', size: '小', times: screenTemp.S1 }) }
      if (screenTemp.S2.length !== 0) { this.screen.push({ num: 'S2', size: '小', times: screenTemp.S2 }) }
      if (screenTemp.S3.length !== 0) { this.screen.push({ num: 'S3', size: '小', times: screenTemp.S3 }) }
    },
    removeSeconds(timeString) {
      const parts = timeString.split(':') // 通过 : 分割字符串
      if (parts.length >= 2) {
        // 如果分割后的部分大于等于2个（时钟和分钟）
        return parts.slice(0, 2).join(':') // 只取前两部分（时钟和分钟）并用 : 连接起来
      } else {
        // 如果分割后的部分少于2个（只有时钟或者其他情况），直接返回原字符串
        return timeString
      }
    },
    convertToShortDate(dateString) {
      const parts = dateString.split(/[年月日]/)
      const month = parseInt(parts[1], 10)
      const day = parseInt(parts[2], 10)
      return `${month}/${day}`
    }
  },
  created() {
    // 将数据存到localStorage和vuex
    const storedData = JSON.parse(localStorage.getItem('movieData'))
    this.movieContent = (typeof this.$store.state.tab.movieList === 'object' && Object.keys(this.$store.state.tab.movieList).length === 0) ? storedData : this.$store.state.tab.movieList
    this.items = this.dates
    // 当页面渲染的时候自定点击
    this.$nextTick(() => {
      this.$refs.myTabs.setCurrentName('1')
    })

    // 获得Movie传来的数据
    this.data = this.$route.params.data
  },
  computed: {
    // 数组slice选出开头和结尾的时间
    displayedItems() {
      return this.items.slice(this.displayStartIndex, this.displayEndIndex + 1)
    },
    // 点击左边边往左移动一格
    leftButtonDisabled() {
      return this.displayStartIndex === 0
    },
    // 点击右边往右移动一格
    rightButtonDisabled() {
      return this.displayEndIndex === this.items.length - 1
    },
    // 获取当前以及接下来7天的时间
    dates() {
      const dates = []
      const currentDate = new Date(this.startDate)

      for (let i = 0; i < 7; i++) {
        const dateString = currentDate.toLocaleDateString()
        const [, month, day] = dateString.split('/')
        const formattedDate = `${month}/${day}`
        dates.push(formattedDate)
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return dates
    }
  }
}
</script>

<style lang="less" scoped>
.movie {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
  padding: 40px 0 20px 0;
  width: 80%;

  .movieTop {
    width: 90%;

    .movieTitle {
      font-size: 25px;
      font-weight: 700;
    }

    .movieContent {
      display: flex;
      margin-top: 10px;

      .movieContentRight {
        margin-left: 40px;

        h3 {
          font-weight: 400;
          font-size: 16px;
          color: #bc1f18;
        }

        p {
          margin-top: 8px;
          font-size: 14px;

          span {
            margin-right: 30px;
            font-size: 15px;
            font-weight: 700;
          }
        }
      }
    }
  }

  .movieMiddle {
    margin-top: 30px;
    width: 90%;
    // background-color: rgb(182, 246, 246);

    .scheduleTitle {
      background-color: #484848;
      padding: 3px 0 3px 15px;

      span {
        color: #fff;
        font-size: 17px;
      }
    }

    .movieTop {
      margin-top: 30px;

      h3 {
        border-left: 5px solid #b71c1c;
        padding-left: 5px;
        margin-left: 20px;
        margin: 0 0 30px 20px;

        span {
          display: block;
          font-size: 16px;
          font-weight: 400;
          color: #4a4c4a;
        }

        span:nth-child(2) {
          font-size: 14px;
        }
      }
    }

    .scheduleContent {
      // height: 500px;

      .el-tabs {

        /deep/.el-tabs__header {
          margin: 0 0 0 0;
          border-bottom: 0px;
        }

        /deep/.el-tabs__nav {
          border-radius: 0;
          width: 100%;
          background-color: #212121;
          padding: 3px 3px 0 3px;
        }

        /deep/.el-tabs__item {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 17px;
          font-weight: 700;
          padding: 19px 0 19px 0;
          height: 100%;
          width: 14.2857%;
          color: #fff;
          text-align: center;
          line-height: 17px;
          border-left: none;
          box-shadow: -1px 4px 0 0 rgb(255, 255, 255);
          border-bottom: none;
        }

        /deep/.el-tabs__item:nth-child(1) {
          box-shadow: none;
        }

        /deep/.el-tabs__item:hover {
          color: #615f5d;
        }

        /deep/.el-tabs__item.is-active {
          background-color: #fff;
          color: #000;
          border-radius: 5px 5px 0 0;
        }
      }

      .el-collapse-item {
        /deep/.el-collapse-item__header {
          display: flex;
          // border-bottom: 1px solid #bdbdbd;
          flex-direction: column;
          align-items: baseline;
          line-height: normal;
          height: auto;

          p {
            margin-top: 15px;
            margin-left: 20px;
            font-weight: 700;
            font-size: 14px;
          }

          .city {
            color: #616161;
          }

          .cinemas {
            color: #212121;
            transition: all 0.1s;
          }

        }

        /deep/.el-collapse-item__header:hover .cinemas {
          opacity: 0.5;
        }

        /deep/.el-collapse-item__arrow {
          position: absolute;
          right: 0;
          top: 50px;
        }

        /deep/.el-icon-arrow-right:before {
          content: "\e6dc";
          display: inline;
          position: relative;
          top: -5px;
          font-weight: 700;
          font-size: 17px;
          margin-bottom: 5px;
        }
      }

      .times {
        background-color: #fff;

        .timesTop {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          cursor: pointer;

          .leftRight {
            display: inline-block;
            font-size: 20px;
            padding: 25px 0;
            font-weight: 700;
            color: #9e9e9e;
            border-radius: 2px;
            transition: all 0.3s;
          }

          .leftRight:hover {
            background-color: #9e9e9e;
            color: #ffffff;
          }

          .content {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85%;

            .active {
              background-color: #d32f2f !important;
            }

            .times {
              font-size: 15px;
              border-right: 1px solid #cacaca;
              // padding: 20px 20px;
              // width: 20%;
              width: 20%;
              height: 80px;
              text-align: center;
              line-height: 65px;
              background-color: #616161;
              color: #fff;

              .months {
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                font-weight: 500;
              }

              .days {
                font-size: 25px;
                font-weight: 600;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

              }
            }

            /deep/.times:nth-child(8) {
              border-right: none;
            }
          }

        }
      }

      .timesContent {
        p {
          color: #b71c1c;
          font-weight: 700;
          font-size: 20px;
          margin-left: 20px;
          margin-top: 10px;
        }

        h3 {
          font-weight: 600;
          margin-left: 20px;
        }

        .screen {
          width: 100%;
          height: 140px;
          background-color: #333333;
          margin: 15px 0 0 0;

          .screenTop {
            padding: 15px 0 0 0;
            font-weight: 500;
            color: #fff;
            font-size: 11px;

            i {
              font-size: 17px;
              color: #d32f2f;
              font-weight: 700;
            }
          }

          .screenContent {
            display: inline-block;
            position: relative;
            width: 135px;
            height: 70px;
            border-radius: 3px;
            background-color: #fff;
            margin: 6px 0 0 20px;
            transition: all 0.3s;
            cursor: pointer;

            .startTime {
              position: absolute;
              top: 7px;
              left: 10px;
              font-style: normal;
              font-size: 17px;
              font-weight: 700;
            }

            .endTime {
              position: absolute;
              font-style: normal;
              font-size: 11px;
              font-weight: 700;
              top: 10px;
              right: 15px;
              color: #8a8a8a;
            }

            .selling {
              position: absolute;
              left: 41px;
              bottom: 8px;
              font-size: 11px;
              color: #1976d2;
              font-weight: 600;
            }
          }

          .screenContent:hover {
            background-color: #adadad;
          }
        }
      }
    }
  }

  .movieBottom {
    margin-bottom: 50px;
    width: 60%;

    div {
      padding: 15px 0;
      background-color: #1850a5;
      color: #fff;
      font-weight: 600;
      margin-top: 20px;
      font-size: 17px;
      text-align: center;
      line-height: 17px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      cursor: pointer;
      transition: all 0.3s;
      letter-spacing: 2px;
    }

    div:hover {
      background-color: #b82121;
    }
  }

}
</style>
