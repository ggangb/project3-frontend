<template>
  <div class="container">
    <div class="spot">
      <div class="home_spot">
      </div>
    </div>
    <div class="home_news">
      <div class="home_wrap">
        <div class="home_main">
          <div class="home_headline">
    <div class="news_form" v-for="(news, idx) in newsData.slice(0,6)" :key="idx">
      <ul>
        <li>
          <div class="text">
          <a class="news_thumb" :href="news.link"><img :src="news.img"/></a>
      <h1 class="news_title"><a :href="news.link">{{ news.title }}</a></h1>
      <span class="news_description">{{ news.description }}</span>
    </div> 
    </li>
      </ul>
    </div>
  </div>
  </div>
</div>
</div>
<div class="home_sub">
  <div class="home_community">
    <div class="coummunity_post">
      <div class="head">
        <h2>최신글</h2>
        <a class="more"><span>커뮤니티보기</span></a>
      </div>
     
      <ul>
        <li><a>커뮤니티 글</a></li>
      </ul>
    </div>
  </div>
<div class="league_table">
  <div class="rank_table2">
    <div class="head">
      <h2>해외축구 순위표</h2>
      <a class="more"><span>더보기></span></a>
    </div>
    <div class="table_tab">
        <div class="inner">
          <a>프리미어리그</a>
          <a>세리에 A</a>
          <a>라리가</a>
          <a>분데스리가</a>
          <a>리그앙</a>
        </div>
      </div>
      <div class="table_content">
        <table>
          <thead>
            <tr>
              <th class="th_num"><span></span></th>
              <th class="th_team"><span>팀명</span></th>
              <th><span>경기</span></th>
              <th><span>승</span></th>
              <th><span>무</span></th>
              <th><span>패</span></th>
              <th><span>승점</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(epl, idx) in eng.slice(0, 10)" :key="idx">
              <th><span>{{epl.position}}</span></th>
              <td>
                <div class="wrap">
                  <div class="image_flag">
                    <img :src="epl.team.crest">
                  </div>
                  <div class="info">
                    <span class="name">{{epl.team.shortName}}</span>
                  </div>
                </div>
              </td>
              <td><span>{{epl.playedGames}}</span></td>
              <td><span>{{epl.won}}</span></td>
              <td><span>{{epl.draw}}</span></td>
              <td><span>{{epl.lost}}</span></td>
              <td><span>{{epl.points}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
  <div class="rank_table1">
    <div class="home_rank1">
      <div class="head">
        <h2>해외축구 득점 순위</h2>
        <a class="more"><span>더보기></span></a>
      </div>
      <div class="table_tab">
        <div class="inner">
          <a>프리미어리그</a>
          <a>세리에 A</a>
          <a>라리가</a>
          <a>분데스리가</a>
          <a>리그앙</a>
        </div>
      </div>
      <div class="table_content">
        <table>
          <thead>
            <tr>
              <th class="th_num"><span></span></th>
              <th class="th_team"><span>선수명</span></th>
              <th><span>구단</span></th>
              <th><span>골</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(epl_score, idx) in score_eng.slice(0, 4)" :key="idx">
              <th><span>{{idx+1}}</span></th>
              <td>
                <div class="wrap">
                  <div class="info">
                    <span class="name">{{epl_score.player.name}}</span>
                  </div>
                </div>
              </td>
              <td><span>{{epl_score.team.shortName}}</span></td>
              <td><span>{{epl_score.goals}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>
  </div>
</template>

<script>

const api_url = "http://localhost:3000/api/news"; //네이버 뉴스 요청
const table_url = "http://localhost:3000/api/table" //리그 테이블 요청
// const anywhere = "https://proxy.cors.sh/"; //네이버 뉴스 cors 에러
// const headers = {
//   'x-cors-api-key': 'temp_5974a9fff22b31e9b3916d06a9f5d686' //cors 설정 헤더
// }
// const cheerio = require('cheerio'); // 크롤링에 사용/
export default {
  name: 'HelloWorld',
  data() {
    return {
      post: [],
      request: [],
      newsData: [],
      eng: [],
      score_eng: [],
      spa: [],
      score_spa: [],
      ita: [],
      score_ita: [],
      fra: [],
      score_fra: [],
      ger: [],
      score_ger: [],

    }
  },
  methods: {
    getData() {  //네이버 뉴스 정보를 받아오는 메소드
      this.$axios
        .get(api_url
        )
        .then((res) => {
          this.post = res.data.items;
          this.newsData = this.post.map(data => ({ //받아온 데이터의 뉴스 이미지를 위해 img라는 key를 추가
            ...data, img: ''
          }))
      //     this.request = this.newsData.map((res) => { //이미지를 가져오기 위해 axios로 요청을 보낼 뉴스url 배열을 생성
      //         return this.$axios.get(anywhere + res.link , {headers})
      //       })
      //  this.$axios
      //  .all(this.request) //만들어 놓은 뉴스 url 배열로 요청보내기
      //  .then(
      //    this.$axios.spread((...response) => { //응답에서 meta og : image만 가져와서 이미지 url 삽입
      //     for(var i in response) {
      //       var $ = cheerio.load(response[i].data)
      //        var result = $('meta[property=\'og:image\']').attr('content')
      //        this.newsData[i].img = result
      //     }
      //  })
      //  )
      //  .catch((error) => {
      //    console.log(error);
      //  })
    
        })
        .catch((error) => {
          console.log(error);
        })
    },   
    getTable() {
      this.$axios
        .get(table_url)
        .then((res) => {
          this.eng = res.data[0].standings[0].table;
          this.score_eng = res.data[1].scorers;
          console.log(res.data)
          console.log(this.score_eng)

        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
  ,
  created(){
    this.getData();
    this.getTable();
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 1500px;
}
 .home_spot {
  content: '';
    display: block;
    height: 35px;
    background-color: #eff2f8;
    border-bottom: 1px solid #dfe3ec;
 }
 .home_news {
  position:relative;
  padding-bottom: 20px;
  width: 1024px;
  min-height: 485px;
  margin: 0 auto;
  border-bottom: 1px solid grey;
 }
 .home_wrap {
  position: relative;
  height: 400px;
  min-height: 485px;
 }
 .home_main{
  display: table-cell;
    width: 1024px;
    vertical-align: top;
 }
 .home_headline {
  overflow: hidden;
    margin-bottom: -12px;
    padding-top: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
 }
 .news_form {
    float: left;
    width: 505px;
    margin-left: 5px;
    display: table;
    table-layout: fixed;
 }
 .news_form li {
  margin: 15px 0;
 }
  .text {
    height:135px;
  }
 .news_title {
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 15px 0 5px;
  letter-spacing: -1px;
 }
 .news_thumb {
  background-color: #eaeef4;
    position: relative;
    float: left;
    width: 140px;
    min-height: 125px;
    margin-right: 18px;
    
    
 }
 .news_thumb img {
  position: relative;
  vertical-align: top;
  width: 100%;
  height: 135px;
 }
 .news_title a {
  text-decoration: none;
  color: black;
 }.news_title a:hover {
  text-decoration: underline;
 }
 .news_description {
  font-size: 15px;
 }
 .home_community {
  margin-top: 12px;
  float: right;
  width: 610px;
 }
 .home_sub {
  position: relative;
  margin-top: 10px;
  width: 1024px;
  margin: 0 auto;
 }
 .head {
  overflow: hidden;
    position: relative;
    margin-bottom: 14px;
    height: 45px;
    border-top: 1px solid #225dcb;
    border-bottom: 1px solid #f1f1f1;
 }
 .head h2 {
  padding: 0 9px;
    color: #000;
    line-height: 46px;
 }
 .head .more {
  position: absolute;
    top: 10px;
    right: 0;
    color: #888;
    font-size: 11px;
    text-decoration: none;
 }
 .head .more span {
  display: block;
    margin: 7px 9px;
    letter-spacing: -1px;
 }
 .league_table {
  float: left;
  width: 400px;
  margin-top: 12px;
 }
 .rank_table1 {
  width: 400px;
  margin-top: 12px;
 }
 .table_tab {
  overflow: hidden;
    position: relative;
    z-index: 10;
    height: 25px;
    margin-top: -1px;
    padding: 0 10px;
    border-bottom: 1px solid #dddddd;
    text-align: center;
    box-sizing: border-box;
 }
 .table_tab .inner {
    overflow: hidden;
    display: flex;
    justify-content: space-around;
 }
 .table_tab .inner a {
  display: block;
    color: #666;
    text-align: center;
    white-space: normal;
    font-size: 13px;
 }
 .table_content table {
  width: 100%;
  margin-bottom: -1px;

 }
 .table_content .th_num {
  width: 31px;
  text-align: left;
 }
 .table_content .th_team {
  width: 134px;
 }
 .table_content table span {
  display: block;
  padding: 0 4px;
  line-height: 16px;
 }
 .table_content thead th {
  padding: 8px 0 6px;
    border-bottom: 1px solid #f2f2f2;
    background-color: #fbfbfb;
    color: #999;
    font-weight: normal;
    font-size: 11px;
    letter-spacing: -1px;
 }
 .table_content tbody th, .table_content tbody td {
  padding: 11px 0 8px;
    border-bottom: 1px solid #f2f2f2;
    background-color: #fbfbfb;
    color: #000000;
    font-weight: normal;
    font-size: 11px;
    text-align: center;
    letter-spacing: -1px;
 }
 .table_content .wrap {
  display: block;
    position: relative;
    color: #222;
    text-align: left;
    margin-top: -2px;
    margin-bottom: -2px;
 }
 .image_flag {
  overflow: hidden;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
 }
 .image_flag img {
  vertical-align: top;
  width: 20px;
 }
 .info {
  display: inline-block;
    vertical-align: middle;
 }


</style>
