<template>
    <div class="container">
        <div class="content">
            <div class="find_form">

                <form v-on:submit.prevent="changeSubmit">
                    <div class="pannel">
                        <div class="find_img">
                            <img src="@/assets/football.png" />
                        </div>
                        <div class="pannel_inner">
                            <h2>비밀번호 재설정</h2>
                            <div class="form_find">
                                <div class="id_line" ref="checkPw">
                                    <div>
                                        <span class="material-symbols-outlined">lock</span>
                                        <input v-model="password" class="form_pw" type="password"
                                            placeholder="변경할 비밀번호를 입력해주세요" required @input="checkPwRegex" />
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
                            </div>
                            <div class="change_btn">
                                <button type="submit">
                                    <span>비밀번호 재설정하기</span>
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
            pwDuplicateStatus: '',
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
        changeSubmit() {
            const chageData = {
                token : this.$route.query.token,
                password : this.password,
            }
            if (this.password) {
               userService.changePw(chageData)
                .then((res) => {
                    console.log(res);
                    alert('비밀번호 변경완료.')
                    this.$router.push("/login");
                    
                })
                    .catch((error) => {
                        alert(error);
                    })
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
            if (passwordRegex.test(this.password)) {
                ref.style.borderColor = 'green';
                notice.style.color = 'green'
                this.pwDuplicateStatus = 'available';
            } else {
                ref.style.borderColor = 'red';
                notice.style.color = 'red'
                this.pwDuplicateStatus = 'duplicate';
            }
        },
    }
}
</script>
  
<style scoped>
.container {
    min-height: 650px;
}

.content {
    margin-top: 50px;
}

.find_form {
    box-sizing: border-box;
    width: 600px;
    margin: 0 auto;
}

.find_img {
    margin-top: 25px;
}

.find_img img {
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

.form_find .id_line,
.pw_line {
    width: 100%;
    padding: 14px 17px 13px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: none;
    border: 1px solid #c6c6c6;
}


.id_line,
.pw_line {
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

.form_pw {
    vertical-align: top;
    border: none;
    outline: 0;
    height: 25px;
    font-weight: 200;
    font-size: 20px;
    line-height: 19px;
    width: 430px;
    margin-left: 15px;
}

.id_line.active,
.pw_line.active {
    border: 2px solid skyblue;
}


.change_btn button {
    display: block;
    width: 100%;
    padding: 13px 0 13px;
    border-radius: 6px;
    border: solid 1px rgba(0, 0, 0, .15);
    background-color: #268ce0;
    box-sizing: border-box;
    height: 75px;
}

.change_btn span {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
}
</style>