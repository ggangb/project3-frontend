<template>
    <div class="container" >
      <div class="content">
        <div class="login_form">
          
          <form v-on:submit.prevent="loginSubmit">
            <div class="pannel">
              <div class="login_img">
            <img src="@/assets/football.png"/>
          </div>
          <div class="pannel_inner">
                <h2>로그인</h2>
                <div class="form_idpw">
                  <div class="id_line"  :class="{active: idFocus}">
                    <div>
                      <span class="material-symbols-outlined">person</span>
                      <input v-model="username"  class="form_id" type="text"  v-on:click="idActive()" placeholder="아이디" required/>
                    </div>
                  </div>
                  <div class="pw_line"  :class="{active: pwFocus}">
                    <div>
                      <span class="material-symbols-outlined">lock</span>
                      <input v-model="password" class="form_pw" type="password"  v-on:click="pwActive()" placeholder="비밀번호" required/>
                    </div>
                  </div>
                  <ul>
                    <li><a>아이디 찾기</a></li>
                    <li class="pwfind"><a>비밀번호 찾기</a></li>
                    <li class="join"> <router-link to="/register"><a>회원가입</a></router-link></li>
                  </ul>
                </div>
                <div class="login_btn">
                  <button type="submit">
                    <span>로그인</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
      </div>
    </div>
    </div>
  </template>
  
<script>



export default {
  data() {
    return {
      idFocus: false,
      pwFocus: false,
      username: '',
      password: '',
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    idActive() {
      this.pwFocus = false;
      this.idFocus = true;
    },
    pwActive() {
      this.idFocus = false;
      this.pwFocus = true;
    },
    loginSubmit() {
      const user = {
        username : this.username,
        password : this.password
      }
     if (user) {
      this.$store.dispatch("auth/login", user).then(() => {
        alert('환영합니다.')
        this.$router.push('/');
       })
       .catch(() => {
        alert('아이디 비밀번호 확인');
       })
    } 
    }
  }
}
</script>

<style>
.container {
  min-height: 650px;
}
.content {
  margin-top: 50px;
}
  .login_form {
    box-sizing: border-box;
    width: 600px;
    margin: 0 auto;
  }
  .login_img {
    margin-top: 25px;
  }
  .login_img img {
    height: 62px;
    display: block;
    margin: auto;
  }
  .pannel {
    border: 1px solid #c6c6c6;
    border-radius: 6px;
    background-color: #fff;
  }
  .pannel_inner {
    padding: 20px 28px;
  }
  .pannel_inner h2 {
    text-align: center;
    font-size: 35px;
    margin-bottom: 35px;
    color: #888;
  }
  .form_idpw .id_line, .pw_line{
    width: 100%;
    padding: 14px 17px 13px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: none;
    border: 1px solid #c6c6c6;
 }
 .form_idpw ul {
  text-align: center;
  margin-top: 66px;
  margin-bottom: 90px;
 }
 .pwfind, .join {
  padding-left: 25px;
 }
 .pwfind::before, .join::before {
  content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    margin-right: 12px;
    border-radius: 0.5px;
    background-color: #dadada;
 }
 .form_idpw li {
  display: inline-block;
  color: #888;
 }

 .id_line, .pw_line {
  position: relative;
  margin-bottom: 35px;
 }
 .form_id, .form_pw {
  vertical-align: top;
  border: none;
  outline: 0;
  height: 25px;
  font-weight: 200;
  font-size: 20px;
  line-height: 19px;
  width: 450px;
  margin-left: 15px;
 }
 .id_line.active, .pw_line.active {
  border: 2px solid skyblue;
 }


 .login_btn button {
  display: block;
    width: 100%;
    padding: 13px 0 13px;
    border-radius: 6px;
    border: solid 1px rgba(0,0,0,.15);
    background-color: #268ce0;
    box-sizing: border-box;
    height: 75px;
 }
 .login_btn span {
  font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
 }
 </style>