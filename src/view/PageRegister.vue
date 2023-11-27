<template>
    <div class="container" >
      <div class="content">
        <div class="login_form">
          
          <form v-on:submit.prevent="registerSubmit" >
            <div class="pannel">
              <div class="login_img">
            <img src="@/assets/football.png"/>
          </div>
          <div class="pannel_inner">
                <h2>회원가입</h2>
                <div class="form_idpw">
                  <div class="id_line" >
                    <div>
                      <span class="material-symbols-outlined">person</span>
                      <input v-model="username" class="form_id" type="text"  placeholder="아이디" required/>
                    </div>
                  </div>
                  <div class="pw_line"  >
                    <div>
                      <span class="material-symbols-outlined">lock</span>
                      <input v-model="password" class="form_pw" type="password"   placeholder="비밀번호" required/>
                    </div>
                  </div>
                  <div class="email_line"  >
                    <div>
                        <span class="material-symbols-outlined">mail</span>
                      <input v-model="email" class="form_email" type="email"   placeholder="이메일" required/>
                    </div>
                  </div>
                  <div class="phone_line"  >
                    <div>
                        <span class="material-symbols-outlined">smartphone</span>
                      <input v-model="phone" class="form_phone" type="number"  placeholder="전화번호" required/>
                    </div>
                  </div>
                </div>
                <div class="login_btn">
                  <button type="submit">
                    <span>회원가입</span>
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
            username: '',
            password: '',
            email: '',
            phone: ''
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
    registerSubmit() {
      console.log(this.username, this.password, this.email, this.phone);
      const user = {
        username : this.username,
        password : this.password,
        email : this.email,
        phone : this.phone
      }
     if (user) {
      this.$store.dispatch("auth/register", user).then((res) => {
        alert(res.message);
        this.$router.push('/login');
       })
       .catch((error) => {
        alert(error.response.data.message);
       })
    } 
    }
  }
   
  }
  </script>

  <style>
    .form_idpw .id_line, .pw_line, .email_line, .phone_line {
    width: 100%;
    padding: 7px 10px 7px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: none;
    border: 1px solid #c6c6c6;
}
.id_line, .pw_line, .email_line, .phone_line {
    position: relative;
    margin-bottom: 35px;
}
.form_id, .form_pw, .form_email, .form_phone {
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
  