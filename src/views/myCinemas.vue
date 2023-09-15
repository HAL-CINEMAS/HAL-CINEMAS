<template>
  <div>
    <div class="cinemas">
      <myNav></myNav>
      <div class="cinemasContent">
        <div class="images">
          <div class="border">
            <h3>HAL シネマズ</h3>
            <p>名古屋</p>
          </div>
        </div>
        <div class="detail">
          <p class="detail1"><span>HAL</span>シネマズ 名古屋</p>
          <p class="detail2">HAL CINEMAS NAGOYA</p>
          <p class="detail3">
            <span><i class="el-icon-view"></i> 3D</span><span><i class="el-icon-service"></i> ATMOS</span><span><i
                class="el-icon-files"></i> TCX</span><span><i class="el-icon-finished"></i> MX4D</span><span><i
                class="el-icon-data-board"></i> ボックス</span>
          </p>
          <p class="detail4">開場時間</p>
          <p class="detail4">05/30（火） 〜06/08（木） 09:00 OPEN</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myNav from '../components/myNav.vue'
export default {
  name: 'myCinemas',
  components: {
    myNav
  }
}
</script>

<style lang="less" scoped>
.cinemas {
  margin: 0 auto 0 auto;
  width: 80%;
  overflow: auto;
  margin-bottom: 50px;

  .cinemasContent {
    margin-top: 100px;
    width: 100%;
    height: 400px;
    background-color: #292929;
    padding: 20px;
    display: flex;

    .images {
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(../assets/images/cinemas.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 60%;

      .border {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        height: 200px;
        border: 1px solid #e2dede;
        color: #fff;

        h3 {
          width: 40%;
          border-bottom: 1px solid #fff;
          text-align: center;
          font-size: 23px;
          margin-bottom: 10px;
        }

        p {
          font-size: 25px;
          font-weight: 700;
        }
      }
    }

    .detail {
      color: #fff;
      padding: 20px 0 0 50px;

      p {
        margin-bottom: 5px;
      }

      .detail1 {
        font-size: 18px;

        span {
          font-size: 20px;
          font-weight: 700;
        }
      }

      .detail2 {
        font-size: 11px;
      }

      .detail3 {
        margin-bottom: 20px;

        span {
          font-size: 12px;
          border: 1px solid #0d47a1;
          padding: 3px 4px;
          background-color: #ffffff;
          color: #0d47a1;
          border-radius: 5px;
          margin-right: 7px;
        }
      }

      .detail4 {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
