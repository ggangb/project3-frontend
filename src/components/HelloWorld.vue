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
  </div>
</template>

<script>

const api_url = "http://localhost:3000/news"; //서버통신 url
const anywhere = "https://proxy.cors.sh/"; //네이버 뉴스 cors 에러
const headers = {
  'x-cors-api-key': 'temp_5974a9fff22b31e9b3916d06a9f5d686' //cors 설정
}
const cheerio = require('cheerio'); // 크롤링에 사용/
export default {
  name: 'HelloWorld',
  data() {
    return {
      post: [],
      request: [],
      newsData: [],
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
          this.request = this.newsData.map((res) => { //이미지를 가져오기 위해 axios로 요청을 보낼 뉴스url 배열을 생성
              return this.$axios.get(anywhere + res.link , {headers})
            })
       this.$axios
       .all(this.request) //만들어논 뉴스 url 배열로 요청보내기
       .then(
         this.$axios.spread((...response) => { //응답에서 meta og : image만 가져와서 이미지 url 삽입
          for(var i in response) {
            var $ = cheerio.load(response[i].data)
             var result = $('meta[property=\'og:image\']').attr('content')
             this.newsData[i].img = result
          }
       })
       )
       .catch((error) => {
         console.log(error);
       })
    
        })
        .catch((error) => {
          console.log(error);
        })
    }   
  }
  ,
  created(){
    this.getData();
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
    width: 490px;
    margin-left: 20px;
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

</style>
