<template>
  <div>
    <Premium></Premium>
    <div class="userDetail">
      <el-card>ウーさんのマイページ</el-card>
      <el-tabs type="border-card">
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
          <el-descriptions v-for="item in 3" :key="item" class="margin-top" :column="3" :size="size"
            style="margin-top: 20px;" border>
            <template slot="extra">
              <el-button type="primary" size="small">操作</el-button>
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                作品名
              </template>
              岸辺露伴 ルーヴルへ行く
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                鑑賞日
              </template>
              6月2日 (金) 15:00~16:45
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                スクリーン
              </template>
              L1
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                座席・券種
              </template>
              xxxxxxxxxxxxxxxxxxx
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                購入日時
              </template>
              xxxxxxxxxxxxxxxxxxxxxxx
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
  components: {
    Premium
  }
}
</script>

<style lang="less" scoped>
.userDetail {
  margin: auto;
  width: 80%;
  margin-top: 50px;
  background-color: aqua;
}
</style>
