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
                            <h2>이메일 변경</h2>
                            <div class="form_find">
                                <div class="id_line" ref="checkEmail">
                                    <div>
                                        <span class="material-symbols-outlined">
                                            email
                                        </span>
                                        <input v-model="email" class="form_pw" type="email"
                                            placeholder="변경할 이메일을 입력해주세요" required @input="checkEmailDuplicate" />
                                        <span class="material-symbols-outlined" style="color:red"
                                            v-if="userEmailDuplicateStatus === 'duplicate'">
                                            close
                                        </span>
                                        <span class="material-symbols-outlined" style="color:green"
                                            v-if="userEmailDuplicateStatus === 'available'">
                                            check
                                        </span>
                                        <span class="material-symbols-outlined"
                                            v-if="userEmailDuplicateStatus === 'checking'">
                                            pending
                                        </span>
                                    </div>
                                </div>
                                <div class="id_notice">
                                    <span class="email_notice" ref="noticeEmail">이메일 형식으로 작성해주세요</span>
                                    <span v-if="userEmailDuplicateStatus === duplicate && mailRegex.test(this.email)" class="email_notice">중복입니다.</span>
                                </div>
                            </div>
                            <div class="change_btn">
                                <button type="submit">
                                    <span>이메일 변경하기</span>
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
import tokenService from '@/service/token.service';



export default {
    data() {
        return {
            token: '',
            password: '',
            userEmailDuplicateStatus: '',
            email: '',
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        changeSubmit() {
            
            const emailChange = {
                email : tokenService.getUserEmail(),
                newEmail : this.email
            }

            console.log(emailChange);
            if (this.email) {
                userService.changeEmail(emailChange)
                    .then((res) => {
                        tokenService.removeUser();
                        tokenService.setUser(res.data);
                        console.log(res);
                        alert('이메일 변경완료.')
                        this.$router.push("/profile");

                    })
                    .catch((error) => {
                        alert(error);
                    })
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

#available {
  border-color: green;
}

#duplicate {
  border-color: red;
}
</style>