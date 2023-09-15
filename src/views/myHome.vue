<template>
  <div class="home">
    <div class="home-content">
      <myNav></myNav>
      <el-card class="login-content">
        <button>ログイン</button>
        <button>会員入会申込</button>
        <span>シネマイレージカードをお持ちで、会員情報登録・パスワード登録をする方はこちらから</span>
      </el-card>
      <div class="ViewPager">
        <el-carousel :interval="5000" type="card" height="300px" trigger="click">
          <el-carousel-item v-for="item in ViewImg" :key="item.title">
            <img :src="require(`../assets/images/${item.img}.jpg`)" alt="">
            <div class="ViewPagerContent">
              <span class="ViewPagerTitle">{{ item.title }}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="AD">
        <img src="../assets/images/AD1.jpg" alt="">
        <img src="../assets/images/ad123.jpg" alt="">

      </div>
    </div>
  </div>
</template>

<script>
import myNav from '../components/myNav.vue'
export default {
  name: 'myHome',
  data() {
    return {
      ViewImg: [
        { title: '名探偵コナン 黒鉄の魚影（サブマリン）', img: 'ViewPager1' },
        { title: '劇場版アイドリッシュセブン', img: 'ViewPager2' },
        { title: '最後まで行く', img: 'ViewPager3' },
        { title: 'ザ・スーパーマリオブラザーズ・ムービー', img: 'ViewPager4' },
        { title: 'auマンデイ', img: 'ViewPager5' }
      ]
    }
  },
  components: {
    myNav
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: #f5f5f5;
  height: 100%;
  overflow: hidden;

  .home-content {
    margin: 0 auto 0 auto;

    width: 80%;

    .login-content {
      display: flex;
      margin-top: 20px;
      color: #0d6fc2;

      button {
        width: 170px;
        font-size: 14px;
        padding: 5px 0 5px 0;
        box-sizing: border-box;
        border: 1px solid #bdbdbd;
        margin-right: 20px;
        color: #fff;
        border-radius: 3px;
        background-color: #a2a2a2;
        cursor: pointer;
        transition: all 0.2s;
      }

      button:nth-child(1):hover {
        background-color: #808080;
      }

      button:nth-child(2) {
        background-color: #fff;
        color: #0d6fc2;
      }

      button:nth-child(2):hover {
        background-color: #0d47a1;
        color: #fff;
      }

      span {
        font-size: 12px;
      }
    }

    .ViewPager {
      margin-top: 40px;
      border-bottom: 1px solid #bdbdbd;

      img {
        width: 100%;
        height: 100%;
      }

      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        margin: 0;
      }

      .el-carousel__item {
        overflow: visible;

        .ViewPagerContent {
          position: absolute;
          bottom: -30px;
          display: flex;

          .ViewPagerTitle {
            padding: 2px 8px;
            border: 1px solid #f44336;
            border-radius: 3px;
            font-size: 10px;
            box-sizing: border-box;
            margin: 0 0 0 50px;
            color: #f44336;
            white-space: nowrap f
          }

        }
      }

      /deep/.el-carousel__button {
        height: 5px;
      }

      /deep/.el-carousel__indicator--horizontal {
        padding: 50px 4px 10px 4px;
      }
    }

    .AD {
      position: fixed;
      bottom: 20px;
      display: flex;
      justify-content: space-around;

      img {
        margin-top: 35px;
        width: 30%;
      }
    }
  }
}
</style>
