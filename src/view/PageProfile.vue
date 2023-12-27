<template>
    <div class="container">
        <div class="content">
            <div class="login_form">

                <div class="pannel">
                    <div class="login_img">
                        <img src="@/assets/football.png" style="height: 50px; float: left;" />
                    </div>
                    <div class="pannel_inner">
                        <div>
                            <span class="material-symbols-outlined" style="font-size: 100px; text-align: center;">
                                account_circle
                            </span>
                        </div>
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
                                    <input v-model="password" @input="checkPwRegex" class="form_pw" type="password"
                                        placeholder="비밀번호" required />
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
                                    <input v-model="phone" @input="checkPhoneRegex" class="form_phone" placeholder="전화번호"
                                        required />
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
            </div>
        </div>
    </div>
</template>
  
  
<script>


export default {
    data() {
        return {

        }
    },
    methods: {

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
    