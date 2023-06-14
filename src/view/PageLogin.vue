<template>
    <div class="container">
      <div class="content">
        <div class="login_form">
          
          <form>
            <div class="pannel">
              <div class="login_img">
            <img src="@/assets/football.png"/>
          </div>
          <div class="pannel_inner">
                <h2>로그인</h2>
                <div class="form_idpw">
                  <div class="id_line">
                    <div>
                      <span class="material-symbols-outlined">person</span>
                      <input class="form_id" type="text" />
                    </div>
                  </div>
                  <div class="pw_line">
                    <div>
                      <span class="material-symbols-outlined">lock</span>
                      <input class="form_pw"/>
                    </div>
                  </div>
                  <ul>
                    <li>아이디 찾기</li>
                    <li>비밀번호 찾기</li>
                    <li>회원가입</li>
                  </ul>
                </div>
                <div>
                  <button>
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

}
</script>

<style scope>

.content {
  margin-top: 50px;
}
  .login_form {
    box-sizing: border-box;
    width: 600px;
    margin: 0 auto;
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
    margin-bottom: 20px;
  }
  .form_idpw .id_line, .pw_line{
    width: 100%;
    padding: 14px 17px 13px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: none;
    border: 1px solid #c6c6c6;
 }
 .form_idpw li {
  display: inline-block;
 }
 .id_line, .pw_line {
  position: relative;
  margin-bottom: 20px;
 }
 .form_id, .form_pw {
  vertical-align: top;
  border: none;
  outline: 0;
  height: 25px;
  width: 450px;
  margin-left: 15px;
 }
 </style>