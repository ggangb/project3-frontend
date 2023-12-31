<template>
    <div class="container">
        <div class="content">
            <div class="login_form">

                <div class="pannel">
                    <div class="pannel_inner">
                        <div class="my_profile">
                            <span class="material-symbols-outlined" style="font-size: 100px; text-align: center; ">
                                account_circle
                            </span>
                            <span class="profile_username">{{ user.username }}</span>
                        </div>
                        <div class="form_info">
                            <div class="account_info">
                                <div class="title">
                                    <h2>내프로필</h2>
                                </div>
                                <div>
                                    <ul class="account_row">
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    person
                                                </span>
                                                <span class="item_text">{{ user.username }}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    lock
                                                </span>
                                                <span class="item_text">비밀번호</span>
                                                <button @click="goPwChange">
                                                    변경
                                                </button>

                                            </div>
                                        </li>
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    email
                                                </span>
                                                <span class="item_text">{{ user.email }}</span>
                                                <button @click="goEmailChange">
                                                    변경
                                                </button>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    phone_iphone
                                                </span>
                                                <span class="item_text">{{ user.phone }}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="account_info">
                                <div class="title">
                                    <h2>이력관리</h2>
                                </div>
                                <div>
                                    <ul class="account_row">
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    edit_document
                                                </span>
                                               <router-link :to="{name: 'PageMyPost', state: { type : 'post'}}"> <span class="item_text" >작성글목록</span></router-link>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    comment
                                                </span>
                                                <router-link :to="{name: 'PageMyPost', state: { type : 'comment'}}"> <span class="item_text">댓글목록</span></router-link>


                                            </div>
                                        </li>
                                        <li>
                                            <div class="row_item">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">
                                                    recommend
                                                </span>
                                                <router-link :to="{name: 'PageMyPost', state: { type : 'recommend'}}">  <span class="item_text">추천글목록</span></router-link>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="profile_btn">
                            <button @click="goHome">
                                <span>확인</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import tokenService from '@/service/token.service';


export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        goPwChange() {
            this.$router.push({
                name: 'PageChangePw', query: {
                    token: this.user.accessToken
                }
            });
        },
        goEmailChange() {
            this.$router.push('/emailchange');
        }
    },
    created() {
        this.user = tokenService.getUser();
        console.log(this.user.accessToken)
    }

}
</script>
  
<style scoped>
.account_info .title {
    position: relative;
    display: block;
    padding: 15px 38px 13px 18px;
    border-radius: 12px 12px 0 0;
    background-image: linear-gradient(256deg, #28b4ff, #255fbe);
}

.account_info {
    padding-top: 15px;
}

.title h2 {
    color: white;
    font-weight: bold;
}

.account_row {
    padding: 0 17px;
    box-shadow: 1px 1px 10px 0 rgba(72, 75, 108, .08);
    border: solid 1px #e3e9ed;
    background-color: #fff;
    box-sizing: border-box;
}

.account_row button {
    float: right;
}

.item_text {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -.8px;
    color: #303038;
    word-break: break-all;
    vertical-align: middle;
    padding-left: 10px;
}

.row_item {
    position: relative;
    padding: 10px 0 10px 10px;
    border-block-end: 1px solid #eee;
}

.my_profile {
    display: flex;
    justify-content: center;
    flex-direction: column;

}

.profile_username {
    text-align: center;
}

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
    min-height: 750px;
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


.profile_btn {
    padding-top: 15px;
}

.profile_btn button {
    display: block;
    width: 100%;
    padding: 13px 0 13px;
    border-radius: 6px;
    border: solid 1px rgba(0, 0, 0, .15);
    background-color: #268ce0;
    box-sizing: border-box;
    height: 75px;
}

.profile_btn span {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
}
</style>
    