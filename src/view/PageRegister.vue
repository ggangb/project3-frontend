<template>
  <div class="container">
    <div class="content">
      <div class="login_form">

        <form v-on:submit.prevent="registerSubmit">
          <div class="pannel">
            <div class="login_img">
              <img src="@/assets/football.png" />
            </div>
            <div class="pannel_inner">
              <h2>회원가입</h2>
              <div class="form_idpw">
                <div class="id_line" ref="checkUser">
                  <div>
                    <span class="material-symbols-outlined">person</span>
                    <input v-model="username" class="form_id" type="text" placeholder="아이디" required
                      @input="checkUsernameDuplicate" />
                    <span class="material-symbols-outlined" style="color:red"
                      v-if="usernameDuplicateStatus === 'duplicate'">
                      close
                    </span>
                    <span class="material-symbols-outlined" style="color:green"
                      v-if="usernameDuplicateStatus === 'available'">
                      check
                    </span>
                    <span class="material-symbols-outlined" v-if="usernameDuplicateStatus === 'checking'">
                      pending
                    </span>
                  </div>
                </div>
                <div class="id_notice">
                  <span ref="idnotice">4글자 이상</span>
                </div>
                <div class="pw_line" ref="checkPw">
                  <div>
                    <span class="material-symbols-outlined">lock</span>
                    <input v-model="password" @input="checkPwRegex" class="form_pw" type="password" placeholder="비밀번호" required />
                    <span class="material-symbols-outlined" style="color:red"
                      v-if="pwDuplicateStatus === 'duplicate'">
                      close
                    </span>
                    <span class="material-symbols-outlined" style="color:green"
                      v-if="pwDuplicateStatus === 'available'">
                      check
                    </span>
                  </div>
                </div>
                <div class="id_notice">
                  <span class="pw_notice" ref="noticePw">영문+숫자를포함 6자리 이상</span>
                </div>
                <div class="email_line" ref="checkEmail">
                  <div>
                    <span class="material-symbols-outlined">mail</span>
                    <input v-model="email" class="form_email" type="email" placeholder="이메일" required
                      @input="checkEmailDuplicate" />
                    <span class="material-symbols-outlined" style="color:red"
                      v-if="userEmailDuplicateStatus === 'duplicate'">
                      close
                    </span>
                    <span class="material-symbols-outlined" style="color:green"
                      v-if="userEmailDuplicateStatus === 'available'">
                      check
                    </span>
                    <span class="material-symbols-outlined" v-if="userEmailDuplicateStatus === 'checking'">
                      pending
                    </span>
                  </div>
                </div>
                <div class="id_notice">
                  <span ref="noticeEmail">이메일 형식으로 작성해주세요.</span>
                </div>
                <div class="phone_line" ref="checkPhone">
                  <div>
                    <span class="material-symbols-outlined">smartphone</span>
                    <input v-model="phone" @input="checkPhoneRegex" class="form_phone" placeholder="전화번호" required />
                    <span class="material-symbols-outlined" style="color:red"
                      v-if="phoneDuplicateStatus === 'duplicate'">
                      close
                    </span>
                    <span class="material-symbols-outlined" style="color:green"
                      v-if="phoneDuplicateStatus === 'available'">
                      check
                    </span>
                  </div>
                </div>
                <div class="id_notice">
                  <span ref="noticePhone">예시 : 010-0000-0000</span>
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
import userService from '@/service/user.service';


export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      phone: '',
      usernameDuplicateStatus: '',
      userEmailDuplicateStatus: '',
      phoneDuplicateStatus: '',
      pwDuplicateStatus: '',
      inputBorderColor: 'inital',
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
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
      }
      if (user) {
        this.$store.dispatch("/auth/register", user).then((res) => {
          alert(res.message);
          this.$router.push('/login');
        })
          .catch((error) => {
            alert(error.response.data.message);
          })
      }
    },
    checkUsernameDuplicate() {
      const notice = this.$refs.idnotice;
      if (this.username === '') {
        this.usernameDuplicateStatus = '';
        const ref = this.$refs.checkUser;
        ref.style.borderColor = '#c6c6c6';
        notice.style.color = '';
        return;
      }

      this.usernameDuplicateStatus = 'checking';
      if (this.username.length >= 4) {
        userService.checkUserId(this.username)
          .then(
            (res) => {
              console.log(res.data);
              if (res.data) {
                this.usernameDuplicateStatus = 'duplicate';
                const ref = this.$refs.checkUser;
                ref.style.borderColor = 'red';
              } else {
                this.usernameDuplicateStatus = 'available';
                const ref = this.$refs.checkUser;
                ref.style.borderColor = 'green';
                notice.style.color = 'green';
              }
            })
          .catch(error => {
            console.log(error);
            this.usernameDuplicateStatus = '';
          })

      } else {
        this.usernameDuplicateStatus = 'duplicate';
        const ref = this.$refs.checkUser;
        ref.style.borderColor = 'red';
        notice.style.color = 'red';
      }

    
    },
    checkPwRegex() {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const ref = this.$refs.checkPw;
      const notice = this.$refs.noticePw;
      if (this.password === '') {
        ref.style.borderColor = '#c6c6c6';
        notice.style.color = ''
        this.pwDuplicateStatus = '';
        return;
      }
      if(passwordRegex.test(this.password)) {
        ref.style.borderColor = 'green';
        notice.style.color = 'green'
        this.pwDuplicateStatus = 'available';
      } else {
        ref.style.borderColor = 'red';
        notice.style.color = 'red'
        this.pwDuplicateStatus = 'duplicate';
      }
    },
    checkPhoneRegex() {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      const ref = this.$refs.checkPhone;
      const notice = this.$refs.noticePhone;
      if (this.phone === '') {
        ref.style.borderColor = '#c6c6c6';
        notice.style.color = ''
        this.phoneDuplicateStatus = ''
        return;
      }
      if(phoneRegex.test(this.phone)) {
        ref.style.borderColor = 'green';
        notice.style.color = 'green'
        this.phoneDuplicateStatus = 'available'
      } else {
        ref.style.borderColor = 'red';
        notice.style.color = 'red'
        this.phoneDuplicateStatus = 'duplicate'
      }

    },
    checkEmailDuplicate() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const notice = this.$refs.noticeEmail;
      if (this.email === '') {
        this.userEmailDuplicateStatus = '';
        const ref = this.$refs.checkEmail;
        ref.style.borderColor = '#c6c6c6';
        notice.style.color = '';
        return;
      }
     
      this.userEmailDuplicateStatus = 'checking';
      if (emailRegex.test(this.email)) {
        notice.style.color = 'green';
        userService.checkUserEmail(this.email)
          .then(
            (res) => {
              console.log(res.data);
              if (res.data) {
                this.userEmailDuplicateStatus = 'duplicate';
                const ref = this.$refs.checkEmail;
                ref.style.borderColor = 'red';

              } else {
                this.userEmailDuplicateStatus = 'available';
                const ref = this.$refs.checkEmail;
                ref.style.borderColor = 'green';
              }
            })
          .catch(error => {
            console.log(error);
            this.userEmailDuplicateStatus = '';
          })
      } else {
        this.userEmailDuplicateStatus = 'duplicate';
        const ref = this.$refs.checkEmail;
        ref.style.borderColor = 'red';
        notice.style.color = 'red';

      }


    },

  }

}
</script>

<style scoped>
.form_idpw .id_line,
.pw_line,
.email_line,
.phone_line {
  width: 100%;
  padding: 7px 10px 7px;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid #c6c6c6;
}

#available {
  border-color: green;
}

#duplicate {
  border-color: red;
}

.id_line,
.pw_line,
.email_line,
.phone_line {
  position: relative;

}

.id_notice {
  padding-left: 10px;
  height: 35px;
  font-size: 12px;
}

.pw_notice {
  vertical-align: middle;
}

.form_id,
.form_pw,
.form_email,
.form_phone {
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
  border: solid 1px rgba(0, 0, 0, .15);
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
  