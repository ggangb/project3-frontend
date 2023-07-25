<template>
  <header class="football_header">
    <div class="football_nav">
      <h1 class="logo_area">
        <a  class="logo_football" >
          <router-link to="/">
          <img class="logo_img" src="@/assets/football.png">
          </router-link>
        </a>
      </h1>
      <div v-if="!currentUser" class="football_tool">
        <button class="nav_btn">
          <router-link to="/login"><a class="nav_btn_login">로그인</a></router-link>
        </button>
    </div>
    <div v-if="currentUser" class="football_tool">
        <button class="nav_btn">
          <a  @click.prevent="logOut" class="nav_btn_login">로그아웃</a>
        </button>
    </div>
    </div>
    <div class="football_nav_sub">
      <ul class="football_category">
        <li class="category_item">
          <router-link to="/"><span class="category_home">홈</span></router-link>
        </li>
        <li class="category_item">
          <router-link to="/community"><span class="category_btn_com">커뮤니티</span></router-link>
        </li>
        <li class="category_item">
          <a class="category_btn_news">뉴스</a>
        </li>
        <li class="category_item">
          <a class="category_btn_rank">기록/순위</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
        this.$router.push('/');
    }
  }

}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgba(255,255,255,0.5);
}
 .football_header {
  background-image: linear-gradient(256deg,#28b4ff,#255fbe);
  position: relative;
}
.football_nav {
  position: relative;
    width: 1024px;
    margin: 0 auto;
    height: 60px;
    font-size: 1px;
}
.football_nav .logo_area {
  float: left;
  display: flex;
}
.football_nav .logo_football {
    padding: 5px 9px 14px 12px;
}
.logo_img {
  display: inline-block;
    width: 150px;
    height: 40px;
}
.football_tool {
  float: right;
  padding: 2px;
  margin-top: 15px;
}
.nav_btn {
  display: inline-block;
}
.nav_btn_login {
  width: 45px;
  height: 25px;
  color: black;
}
.category_item {
  float: left;
  margin-left: 15px;
  font-weight: bold;
    padding: 18px 10px 20px;
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
}


.football_category {
  display: flex;
  width: 1024px;
  margin: 0 auto;
  padding-left: 5px;
}
.football_nav_sub {
  height: 60px;
  border-top: 1px solid white;
}


ul {
  list-style: none;
}

.router-link-active {
  font-weight: 800;
  color: white !important;
}
</style>