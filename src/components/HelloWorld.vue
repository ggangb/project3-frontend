<template>
  <div class="container">
    <div class="spot">
      <div class="home_spot">
      </div>
    </div>
    <div v-for="(news, idx) in post" :key="idx">
      <h2 class="news_title"><a :href="news.link">{{ news.title }}</a></h2>
      <span class="news_description">{{ news.description }}</span>
      <img :src="img"/>
    </div>
  </div>
</template>

<script>

const api_url = "http://localhost:3000/news";
// const anywhere = "https://proxy.cors.sh/";
// const headers = {
//   'x-cors-api-key': 'temp_5974a9fff22b31e9b3916d06a9f5d686'
// }
// const cheerio = require('cheerio');
export default {
  name: 'HelloWorld',
  data() {
    return {
      post: [],
      imgpost: [],
    }
  },
  methods: {
    getData() {
      this.$axios
        .get(api_url
        )
        .then((res) => {
          this.post = res.data.items;
          console.log(this.post);
          const filter = this.post.map(data => ({
            ...data, img: ''
          }))
          this.imgpost = [...filter]
    //       for(var i = 0; i < this.post.length; i++) {
    //       this.$axios
    //       .get(anywhere + this.post[i].link, {headers} )
    //   .then((res) => {
    //     // const $ = cheerio.load(res.data);
    //     // this.post[i].originallink.push($('meta[property=\'og:image\']').attr('content'))

    //     console.log(this.post)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    // getImg() {

    //   this.$axios
    //   .get(anywhere + "https://sports.news.naver.com/news.nhn?oid=413&aid=0000161057" )
    //   .then((res) => {
    //     const $ = cheerio.load(res.data);
    //     result = $('meta[property=\'og:image\']').attr('content')
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // }
   
    
  }
  ,mounted() {
    this.getData();
    // this.getImg();
  }
};
</script>

<style scoped>
 .home_spot {
  content: '';
    display: block;
    height: 11px;
    background-color: #eff2f8;
    border-bottom: 1px solid #dfe3ec;
 }
 .news_title {
  font-size: 30px;
  font-weight: bold;
 }
 .news_description {
  font-size: 15px;
 }
</style>
