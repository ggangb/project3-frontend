<template>
    <div class="container">
        <div class="content">
            <div class="find_form">

                <form v-on:submit.prevent="findSubmit">
                    <div class="pannel">
                        <div class="find_img">
                            <img src="@/assets/football.png" />
                        </div>
                        <div class="pannel_inner">
                            <h2>아이디/비번 찾기</h2>
                            <div class="form_find">
                                <div class="id_line">
                                    <div>
                                        <span class="material-symbols-outlined">mail</span>
                                        <input v-model="email" class="form_email" type="text"
                                            placeholder="이메일" required />
                                    </div>
                                </div>
                            </div>
                            <div class="find_btn">
                                <button type="submit">
                                    <span>이메일로 아이디/비밀번호 받기</span>
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
            email: '',
        }
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        findSubmit() {
            if (this.email) {
               userService.findAccount(this.email)
                .then((res) => {
                    console.log(res);
                    if(res.data === true){
                    alert('이메일로 전송되었습니다.')
                    }
                })
                    .catch((error) => {
                        alert(error);
                    })
            }
        }
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
    margin-bottom: 35px;
}

.form_email{
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

.id_line.active,
.pw_line.active {
    border: 2px solid skyblue;
}


.find_btn button {
    display: block;
    width: 100%;
    padding: 13px 0 13px;
    border-radius: 6px;
    border: solid 1px rgba(0, 0, 0, .15);
    background-color: #268ce0;
    box-sizing: border-box;
    height: 75px;
}

.find_btn span {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
}
</style>