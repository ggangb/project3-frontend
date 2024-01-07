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
            <div class="news_form" v-for="(news, idx) in newsData.slice(0, 6)" :key="idx">
              <ul>
                <li>
                  <div class="text">
                    <a class="news_thumb" :href="news.link"><img :src="news.img" /></a>
                    <div class="news_textarea">
                      <h1 class="news_title"><a :href="news.link">{{ removeTag(news.title, 'b') }}</a></h1>
                      <span class="news_description">{{ removeTag(news.description, 'b') }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home_sub">
      <div class="trans">
        <div class="trans_post">
          <div class="head">
            <h2>이적뉴스</h2>
          </div>
          <div class="trans_form" v-for="(transnews, idx) in modifiedTrans" :key="idx">
            <ul>
              <li>
                <div>
                  <div class="trans_textarea">
                    <h1 class="trans_title"><a :href="transnews.link">{{ removeTag(transnews.title, 'b') }}</a></h1>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <ul>
          </ul>
        </div>
      </div>
      <div class="home_community">
        <div class="coummunity_post">
          <div class="home_community_head">
            <h2>최신글</h2>
            <router-link to="/community"><a class="more"><span>더보기></span></a></router-link>
          </div>
          <table>
            <colgroup>
              <col width="80">
              <col width="10">
              <col width="10">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>제목</span></th>
                <th scope="col"><span>작성일</span></th>
                <th scope="col"><span>작성자</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(newPosts, idx) in newPost.slice(0, 6)" :key="idx">
                <td><router-link :to="`community/${newPosts.idx}`"><span>{{ newPosts.title }}</span></router-link></td>
                <td>
                  <div class="wrap">
                    <div class="info">
                      <span class="name">{{ newPosts.date
                      }}</span>
                    </div>
                  </div>
                </td>
                <td><span>{{ newPosts.username }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="league_table">
        <div class="rank_table2">
          <div class="head">
            <h2>해외축구 순위표</h2>
            <router-link to="/rank"><a class="more"><span>더보기></span></a></router-link>
          </div>
          <div class="table_tab">
            <div class="inner">
              <ul class="league_list">
                <li v-for="league in leagues" :key="league.code" :class="{ active: activeLeague === league.code }">
                  <a @click="getTable(league.code)">{{ league.name }}</a>
                </li>
              </ul>
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
                <tr v-for="(tables, idx) in table.slice(0, 10)" :key="idx">
                  <th><span>{{ tables.position }}</span></th>
                  <td>
                    <div class="wrap">
                      <div class="image_flag">
                        <img :src="tables.team.crest">
                      </div>
                      <div class="info">
                        <span class="name">{{ tables.team.shortName }}</span>
                      </div>
                    </div>
                  </td>
                  <td><span>{{ tables.playedGames }}</span></td>
                  <td><span>{{ tables.won }}</span></td>
                  <td><span>{{ tables.draw }}</span></td>
                  <td><span>{{ tables.lost }}</span></td>
                  <td><span>{{ tables.points }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="rank_table1">
          <div class="home_rank1">
            <div class="head">
              <h2>해외축구 득점 순위</h2>
              <router-link to="/rank"><a class="more"><span>더보기></span></a></router-link>
            </div>
            <div class="table_tab">
              <div class="inner">
                <ul class="league_list">
                  <li v-for="league in leagues" :key="league.code" :class="{ active: activeScore === league.code }">
                    <a @click="getScore(league.code)">{{ league.name }}</a>
                  </li>
                </ul>
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
                  <span v-if="score.length == 0">기록없음</span>
                  <tr v-for="(scorer, idx) in score.slice(0, 5)" :key="idx">
                    <th><span>{{ idx + 1 }}</span></th>
                    <td>
                      <div class="wrap">
                        <div class="info">
                          <span class="name">{{ scorer.player.name }}</span>
                        </div>
                      </div>
                    </td>
                    <td><span>{{ scorer.team.shortName }}</span></td>
                    <td><span>{{ scorer.goals }}</span></td>
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
const api_url = BASE_URL+"/home/news"; //네이버 뉴스 요청
const trans_url = BASE_URL+"/home/trans"; //네이버 뉴스 요청
const newpost =  BASE_URL+"/home/board" //최신글 요청
const anywhere = "https://proxy.cors.sh/"; //네이버 뉴스 cors 에러
const headers = {
  'x-cors-api-key': 'temp_1827830fbc462df024ee3074f62046cd' //cors 설정 헤더
}
const cheerio = require('cheerio'); // 크롤링에 사용/
export default {
  name: 'HelloWorld',
  data() {
    return {
      post: [],
      request: [],
      newsData: [],
      modifiedTrans: [],
      table: [],
      newPost: [],
      score: [],
      activeLeague: 'PL',
      activeScore: 'PL',
      leagues: [
        { code: 'PL', name: '프리미어리그' },
        { code: 'SA', name: '세리에 A' },
        { code: 'PD', name: '라리가' },
        { code: 'BL1', name: '분데스리가' },
        { code: 'FL1', name: '리그앙' },
      ],
    };
  },
  methods: {
    getData() {  //네이버 뉴스 정보를 받아오는 메소드
      this.$axios
        .get(api_url
        )
        .then((res) => {
          this.post = res.data.items;
          console.log(res)
          this.newsData = this.post.map(data => ({ //받아온 데이터의 뉴스 이미지를 위해 img라는 key를 추가
            ...data, img: ''
          }))
          this.request = this.newsData.map((res) => { //이미지를 가져오기 위해 axios로 요청을 보낼 뉴스url 배열을 생성
            return this.$axios.get(anywhere + res.link, { headers })
          })
          this.$axios
            .all(this.request) //만들어 놓은 뉴스 url 배열로 요청보내기
            .then(
              this.$axios.spread((...response) => { //응답에서 meta og : image만 가져와서 이미지 url 삽입
                response.forEach((response, i) => {
                  const $ = cheerio.load(response.data);
                  const result = $('meta[property=\'og:image\']').attr('content');
                  this.newsData[i].img = result;
                });
                const modifiedNews = JSON.stringify(this.newsData).replace(/&quot;/g, '');
                this.newsData = JSON.parse(modifiedNews);

              })
            )
            .catch((error) => {
              console.log(error);
            })

        })
        .catch((error) => {
          console.log(error);
        })


    },

    // 리그 테이블 데이터를 가져오는 메서드
    getTable(league) {
      if(league == null || league == undefined){
        league = "PL"
      }
      this.activeLeague = league;
      const tableUrl = `${process.env.VUE_APP_BASE_URL}/home/table/${league}`;
      this.$axios
        .get(tableUrl)
        .then((res) => {
          this.table = res.data.standings[0].table;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getScore(league) {
      if(league == null || league == undefined){
        league = "PL"
      }
      this.activeScore = league;
      const scoreUrl = `${process.env.VUE_APP_BASE_URL}/home/score/${league}`;
      this.$axios
        .get(scoreUrl)
        .then((res) => {
          this.score = res.data.scorers;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTrans() {
      this.$axios
        .get(trans_url)
        .then((res) => {
          const trans = JSON.stringify(res.data.items);
          const removeTrans = trans.replaceAll('&quot;', '');
          this.modifiedTrans = JSON.parse(removeTrans);
          console.log(res.data)

        })
        .catch((error) => {
          console.log(error);
        })
    },
    getContent() {
      this.$axios
        .get(newpost)
        .then((res) => {
          this.newPost = res.data.content;
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
    },
    removeTag(value, tag) {
      return value.replace(new RegExp(`<${tag}[^>]*>|</${tag}>`, 'gi'), '');
    },
  }
  ,


  created() {
    this.getData();
    this.getTable();
    this.getScore();
    this.getTrans();
    this.getContent();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.league_list {
  display: flex;
  list-style: none;
  padding: 0 10px;
}
.league_list li {
  padding: 0 5px;
}

.container {
  margin: 0 auto;
  min-height: 1400px;
}

.home_spot {
  content: '';
  display: block;
  height: 35px;
  background-color: #eff2f8;
  border-bottom: 1px solid #dfe3ec;
}

.home_news {
  position: relative;
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

.home_main {
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

.trans_form {
  padding: 13px 0;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fbfbfb;
  color: #999;
  font-weight: normal;
  font-size: 22px;
  letter-spacing: -1px;
}

.trans_form a {
  text-decoration: none;
  color: black;
}

.trans_form a:hover {
  text-decoration: underline;
}

.trans_textarea {
  text-align: center;
  font-size: 15px;
  font-weight: 400;
}

.trans_form .news_form li {
  margin: 15px 0;
}

.text {
  height: 135px;
}

.news_textarea {
  padding: 0 20px;
  letter-spacing: -0.5px;
  vertical-align: middle;
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
  border-radius: 6px;
}

.news_title a {
  text-decoration: none;
  color: black;
}

.news_title a:hover {
  text-decoration: underline;
}

.news_description {
  font-size: 13px;
}

.home_community,
.trans {
  float: right;
  width: 610px;
}


.home_community {
  margin-top: 17px;
  height: 296px;
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

.trans_post .head {
  overflow: hidden;
  position: relative;
  height: 45px;
  border-top: 1px solid #225dcb;
  border-bottom: 1px solid #f1f1f1;
}

.home_community_head {
  overflow: hidden;
  position: relative;
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

.home_community_head .more {
  position: absolute;
  top: 15px;
  right: 0;
  color: #888;
  font-size: 11px;
  text-decoration: none;
}

.home_community_head h2 {
  padding: 0 9px;
  color: #000;
  line-height: 46px;
}

.head .more span {
  display: block;
  margin: 7px 9px;
  letter-spacing: -1px;
}

.league_table {
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

.table_tab .inner .active a {
  color: #225dcb !important;
}

.table_content table,
.home_community table {
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

.table_content table span,
.home_community table span {
  display: block;
  padding: 0 4px;
  line-height: 16px;
}

.table_content thead th,
.home_community thead th {
  padding: 8px 0 6px;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fbfbfb;
  color: #999;
  font-weight: normal;
  font-size: 11px;
  letter-spacing: -1px;
}

.table_content tbody th,
.table_content tbody td,
.home_community tbody td {
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
