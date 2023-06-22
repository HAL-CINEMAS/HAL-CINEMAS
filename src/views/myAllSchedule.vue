<template>
  <div>
    <div class="schedule">
      <myNav></myNav>
      <div class="movieSchedule">
        <div class="left">
          <el-timeline>
            <h3 class="title">上映中</h3>
            <el-timeline-item timestamp="2023/05/26" placement="top" :color="color" :size="'large'">
              <el-card class="movieContent">
                <img src="../assets/images/movie1.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/05/26" placement="top" :color="color" :size="'large'">
              <el-card>
                <img src="../assets/images/movie2.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/05/26" placement="top" :color="color" :size="'large'">
              <el-card class="movieContent">
                <img src="../assets/images/movie3.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="right">
          <el-timeline>
            <h3 class="title">公開予定</h3>
            <el-timeline-item timestamp="2018/4/12" placement="top" :color="'#e6a23c'" :size="'large'">
              <el-card>
                <img src="../assets/images/movie3.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/12" placement="top" :color="'#e6a23c'" :size="'large'">
              <el-card>
                <img src="../assets/images/movie3.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/12" placement="top" :color="'#e6a23c'" :size="'large'">
              <el-card>
                <img src="../assets/images/movie3.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/12" placement="top" :color="'#e6a23c'" :size="'large'">
              <el-card>
                <img src="../assets/images/movie3.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/12" placement="top" :color="'#e6a23c'" :size="'large'">
              <el-card>
                <img src="../assets/images/movie3.png" alt="">
                <div>123123123</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myNav from '../components/myNav.vue'
export default {
  name: 'myAllSchedule',
  data() {
    return {
      color: '#0bbd87'
    }
  },
  components: {
    myNav
  }
}
</script>

<style lang="less" scoped>
.schedule {
  margin: 0 auto 0 auto;
  width: 80%;
  overflow: auto;
  margin-bottom: 50px;

  .movieSchedule {
    margin-top: 50px;
    width: 100%;
    display: flex;
    background-color: #fff;
    margin-bottom: 50px;

    .left,
    .right {
      padding: 20px;
      width: 50%;

      .title {
        font-size: 20px;
        margin-bottom: 20px;

      }
    }

    // .right {
    //   padding: 20px;
    //   width: 50%;
    // }
  }

  .el-timeline-item {

    .el-card {
      /deep/.el-card__body {
        display: flex;

        img {
          margin-right: 20px;
        }
      }

    }
  }

  /deep/.el-timeline-item__timestamp {
    font-weight: 700;
  }
}
</style>
