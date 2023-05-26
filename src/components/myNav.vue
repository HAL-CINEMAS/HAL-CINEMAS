<template>
  <div>
    <div class="nav">
      <span @click="navChange('/movie')" :class="$route.path === '/movie' ? 'active' : ''">映画一覧<i>Films List</i></span>
      <span @click="navChange('/login')" :class="$route.path === '/login' ? 'active' : ''">スケジュール<i>Schedule</i></span>
      <span @click="navChange('/user')" :class="$route.path === '/user' ? 'active' : ''">施設情報<i>Cinema
          Lnformation</i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myNav',
  props: {
    color: String
  },
  methods: {
    navChange(e) {
      if (this.$route.path === e) return
      this.$router.push(e)
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  margin-top: 20px;
  // border-bottom: 3px solid #bdbdbd;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 3px rgba(186, 184, 184, 0.2);

  span {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    width: 33.33333%;
    line-height: 25px;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 3px solid #bdbdbd;
    border-right: 1px solid #ebe8e8;

    i {
      font-size: 10px;
    }
  }

  span:nth-child(3) {
    border-right: none
  }

  .active {
    color: #b71c1c;
    border-bottom: 3px solid #b71c1c;
  }

  span:hover {
    opacity: 0.5;
  }
}
</style>
