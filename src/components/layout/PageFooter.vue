<template>
  <footer id="footer">
    <div class="inner">
      <div class="footer_area">
        <div class="notice_text">공지사항</div>
        <div class="notice_content">
          <a class="notice_link">공지사항 입니다.</a>
        </div>
        <div class="football_league">
          <ul class="league_list">
            <li class="league_item">
              <a class="link_league">
                홈
              </a>
              </li>
            <li class="league_item">
              <router-link to="/community">
              <a class="link_league">
                커뮤니티
              </a>
            </router-link>
            </li>
            <li class="league_item">
              <a class="link_league">
                뉴스
              </a>
            </li>
            <li class="league_item">
              <a class="link_league">
                기록/순위
              </a>
            </li>
            
          </ul>
        </div>
      </div>
      <div class="footer_info">
        <div class="link_area">
          <div class="main_area">
            <a class="link">로그아웃</a>
            <a class="link sitemap">사이트소개</a>
            <a class="link">고객센터</a>
            <a class="link">문제신고</a>
            <a class="link">개인정보처리방침</a>
          </div>
          <div class="sub_area">
            <a class="link"> 책임자 : 강병규</a>
          </div>
        </div>
        <p class="footer_copyright">본 콘텐츠의 저작권은 제공처 또는 이사이트에 있으며, 이를 무단 이용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있습니다.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  
};
</script>

<style scoped>
.inner {
  width: 1000px;
  margin: 0 auto;
  padding: 0 15px;
}
.footer_area {
  display: flex;
  justify-content: center;
  height: 65px;
  align-items: center;
}
.footer_area .notice_text {
  font-size: 15px;
  font-weight: 800;
  color: #606a75;
}
.notice_content .notice_link {
  padding: 0 8px 0 15px;
  letter-spacing: -0.3px;
  color: #606a75;
}
.football_league {
  margin-left: auto;
}
.league_list {
  display: flex;
  font-size: 15px;
  font-weight: 800;
  color: #606a75;
}
.league_item {
  margin: 0 13.5px 0;
}
.football_league .link_league {
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    line-height: 25px;
    vertical-align: top;
    letter-spacing: -0.3px;
    color: #606a75;
}
.link_area {
  display: flex;
  padding-top: 35px;
  justify-content: center;
  border-top: 1px solid #e3e2e2;
  text-align: center;
}

.footer_info .button, .footer_info .link {
    display: inline-block;
    font-size: 12px;
    line-height: 21px;
    color: #878e98;
    text-align: center;
    margin-left: 15px;
    vertical-align: top;
}
.footer_info .footer_copyright {
    padding: 8px 0 10px;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.3px;
    word-break: keep-all;
    color: #8a909e;
    text-align: center;
}

  ul {
    list-style: none;
  }
  a {
      text-decoration: none;
  }
</style>