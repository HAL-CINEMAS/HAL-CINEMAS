<template>
  <div class="movie" style="background-color:#f5f5f5 ;">
    <div class="movieContent">
      <myNav></myNav>
      <div class="Ad">
        <img src="../assets/images/movie-ad.png" alt="">
      </div>
      <div class="movieList">
        <div class="movieTop">
          <h3><span>上映中作品</span><span>Now Playing</span></h3>
        </div>
        <div class="movieBottom">
          <div class="card" v-for="item in movieList" :key="item.title">
            <div class="front">
              <img :src="require(`../assets/images/${item.img}`)" alt="">
            </div>
            <div class="back">
              <div>
                <p class="backTitle">{{ item.title }}</p>
                <p><i>公開</i>{{ item.data }}</p>
                <p><i>監督</i>{{ item.regulator }}</p>
                <p><i>出演</i>{{ item.performers }}</p>
                <button class="button" @click="buyTicket(item)">詳細へ</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myNav from '../components/myNav.vue'
import fetchData from '../api/index.js'

export default {
  name: 'myMovie',
  data() {
    return {
      movieList: []
    }
  },
  methods: {
    buyTicket(movieC) {
      this.$router.push({
        name: 'Schedule',
        params: movieC
      })
      this.$store.commit('movieItemChange', movieC)
      localStorage.setItem('movieData', JSON.stringify(movieC))
    }
  },
  components: {
    myNav
  },
  created() {
    fetchData().then((res) => {
      console.log(res)
      this.movieList = res
    })
  }
}
</script>

<style lang="less" scoped>
.movieContent {
  margin: 0 auto 0 auto;
  width: 80%;
  overflow: auto;

  .Ad {
    // width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    img {
      width: 50%;
    }
  }

  .movieList {

    .movieTop {
      margin-top: 40px;

      h3 {
        border-left: 5px solid #b71c1c;
        padding-left: 5px;
        margin-left: 20px;
        margin: 0 0 30px 20px;

        span {
          display: block;
          font-size: 15px;
          font-weight: 400;
          color: #4a4c4a;
          line-height: 16px;
        }

        span:nth-child(2) {
          font-size: 13px;
        }
      }
    }

    .movieBottom {
      display: flex;
      // justify-content: space-between;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 50px;
    }

    .heading {
      width: 100%;
      margin-left: 1rem;
      font-weight: 900;
      font-size: 1.618rem;
      text-transform: uppercase;
      letter-spacing: 0.1ch;
      line-height: 1;
      padding-bottom: 0.5em;
      margin-bottom: 1rem;
      position: relative;
    }

    .heading:after {
      display: block;
      content: "";
      position: absolute;
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, #1a9be6, #1a57e6);
      bottom: 0;
    }

    .description {
      width: 100%;
      margin-top: 0;
      margin-left: 1rem;
      margin-bottom: 3rem;
      // margin-bottom: 3rem;
    }

    .card {
      color: inherit;
      cursor: pointer;
      min-width: 230px;
      min-height: 330px;
      perspective: 1000px;
      margin: 1rem;
      position: relative;
    }

    @media screen and (max-width: 800px) {
      .card {
        width: calc(50% - 2rem);
      }
    }

    @media screen and (max-width: 500px) {
      .card {
        width: 100%;
      }
    }

    .front,
    .back {
      display: flex;
      border-radius: 6px;
      background-position: center;
      background-size: cover;
      text-align: center;
      justify-content: center;
      align-items: center;
      position: absolute;
      height: 331px;
      width: 234px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      transition: ease-in-out 600ms;

    }

    .front {
      background-size: cover;
      // padding: 2rem;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      // overflow: hidden;
      font-family: Poppins, sans-serif;

    }

    .back {
      font-size: 10px;
      border: 1px solid #dcd9d9;

      .backTitle {
        font-weight: 700;
        font-size: 17px;
      }

      i {
        display: block;
        font-size: 15px;
        font-weight: 700;
        margin: 5px 0 5px 0;
      }

      p {
        font-size: 12px;
      }
    }

    .front:before {
      position: absolute;
      display: block;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #1a9be6, #1a57e6);
      opacity: 0.25;
      z-index: -1;
      box-shadow: 0 1px 3px rgba(186, 184, 184, 0.2);
    }

    .card:hover .front {
      transform: rotateY(180deg);
    }

    .card:nth-child(even):hover .front {
      transform: rotateY(-180deg);
    }

    .back {
      background: #fff;
      transform: rotateY(-180deg);
      padding: 2em 2em;
    }

    .card:hover .back {
      transform: rotateY(0deg);
    }

    .card:nth-child(even) .back {
      transform: rotateY(180deg);
    }

    .card:nth-child(even):hover .back {
      transform: rotateY(0deg);
    }

    .button {
      transform: translateZ(40px);
      cursor: pointer;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      font-weight: bold;
      color: #fff;
      padding: 0.8em 1.7em;
      border-radius: 5px;
      font: inherit;
      background: linear-gradient(135deg, #f27373, #cd3939);
      border: none;
      position: relative;
      transform-style: preserve-3d;
      transition: 300ms ease;
      margin: 15px 0 0 0;
    }

    .button:before {
      transition: 300ms ease;
      position: absolute;
      display: block;
      content: "";
      transform: translateZ(-40px);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 100px;
      left: 10px;
      top: 16px;
    }

    .button:hover {
      opacity: 0.5;
    }
  }
}
</style>
