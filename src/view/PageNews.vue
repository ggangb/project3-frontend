<template>
    <div class="wrap">
        <div class="container">
            <div class="newscontent">
                <div class="news_wrap">
                    <div class="content_area">
                        <div class="tab_category">
                            <ul class="list">
                                <li>
                                    <a v-bind:class="{ active: !isActive }" v-on:click="activeClass(idx, league)">
                                        <span>축구 전체</span>
                                    </a>
                                </li>
                                <li v-for="(league, idx) in category" :key="idx">
                                    <a v-bind:class="{ active: isActive && index === idx, '': !isActive }"
                                        v-on:click="activeClass(idx, league)">
                                        <span class="menu">{{ league }}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="news_list">
                            <ul>
                                <li v-for="(news, idx) in newsData.slice(0, 10)" :key="idx">
                                    <a class="thumb" :href="news.link"><img :src="news.img" /></a>
                                    <div class="text">
                                        <a class="news_title" :href="news.link">{{ removeTag(news.title, 'b') }}</a>
                                        <p class="news_content">{{ removeTag(news.description, 'b') }}</p>
                                        <div class="news_date">
                                            <span class="time" v-text="news.pubDate"></span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="pageable">
                            <a v-for="(paging, idx) in pages" :key="idx" v-on:click="onPageChange(paging)"
                                :class="paging === pageIndex ? 'currentPage' : ''">{{ paging }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
const anywhere = "https://proxy.cors.sh/"; //네이버 뉴스 cors 에러
const headers = {
    'x-cors-api-key': 'temp_1827830fbc462df024ee3074f62046cd' //cors 설정 헤더
}
const cheerio = require('cheerio'); // 크롤링에 사용/
const api_url = process.env.VUE_APP_BASE_URL + "/home/newstab";
export default {
    data() {
        return {
            newsData: [],
            pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            category: ["프리미어리그", "라리가", "분데스", "세리에", "리그앙", "UEFA"],
            isActive: false,
            index: 0,
            pageIndex: 1,
            search: "\"해외축구\"",
        }
    },
    methods: {
        getData(keyword) {  //네이버 뉴스 정보를 받아오는 메소드
            if (keyword == null) {
                this.$axios
                    .get(api_url, { params: { start: this.pageIndex, keyword: "\"해외축구\"" } }) // 네이버 뉴스 API에서 데이터를 가져옵니다
                    .then(async (res) => { // 데이터를 성공적으로 가져온 경우
                        this.post = res.data.items; // 가져온 데이터의 아이템을 post 변수에 저장합니다
                        console.log(res);
                        this.newsData = this.post.map(data => ({
                            ...data,
                            img: ''
                        })); // 가져온 데이터의 각 아이템에 img라는 키를 추가하여 newsData 배열에 저장합니다
                        const modifiedNews = JSON.stringify(this.newsData).replace(/&quot;/g, ''); // newsData 배열을 JSON 문자열로 변환하고, 문자열에서 &quot;을 제거합니다
                        this.newsData = JSON.parse(modifiedNews); // 수정된 JSON 문자열을 다시 객체로 변환하여 newsData에 저장합니다

                        const requests = this.newsData.map(async (data) => { // 각 뉴스 아이템에 대해 비동기적으로 처리하는 요청을 생성합니다
                            const response = await this.$axios.get(anywhere + data.link, { headers }); // 각 뉴스의 URL로 요청을 보내고 응답을 받습니다
                            const $ = cheerio.load(response.data); // 응답 데이터를 cheerio를 사용하여 HTML로 파싱합니다
                            const result = $('meta[property=\'og:image\']').attr('content'); // 파싱된 HTML에서 meta 태그 중 og:image 속성의 값을 추출합니다
                            data.img = result; // 추출한 이미지 URL을 해당 뉴스 아이템의 img 속성에 저장합니다
                        });

                        await Promise.all(requests); // 모든 요청이 완료될 때까지 기다립니다

                    })
                    .catch((error) => {
                        console.log(error); // 오류가 발생한 경우 오류를 출력합니다
                    })
            } else {
                this.$axios
                    .get(api_url, { params: { start: this.pageIndex, keyword: this.search } }) // 네이버 뉴스 API에서 데이터를 가져옵니다
                    .then(async (res) => { // 데이터를 성공적으로 가져온 경우
                        this.post = res.data.items; // 가져온 데이터의 아이템을 post 변수에 저장합니다
                        console.log(res);
                        this.newsData = this.post.map(data => ({
                            ...data,
                            img: ''
                        })); // 가져온 데이터의 각 아이템에 img라는 키를 추가하여 newsData 배열에 저장합니다
                        const modifiedNews = JSON.stringify(this.newsData).replace(/&quot;/g, ''); // newsData 배열을 JSON 문자열로 변환하고, 문자열에서 &quot;을 제거합니다
                        this.newsData = JSON.parse(modifiedNews); // 수정된 JSON 문자열을 다시 객체로 변환하여 newsData에 저장합니다

                        const requests = this.newsData.map(async (data) => { // 각 뉴스 아이템에 대해 비동기적으로 처리하는 요청을 생성합니다
                            const response = await this.$axios.get(anywhere + data.link, { headers }); // 각 뉴스의 URL로 요청을 보내고 응답을 받습니다
                            const $ = cheerio.load(response.data); // 응답 데이터를 cheerio를 사용하여 HTML로 파싱합니다
                            const result = $('meta[property=\'og:image\']').attr('content'); // 파싱된 HTML에서 meta 태그 중 og:image 속성의 값을 추출합니다
                            data.img = result; // 추출한 이미지 URL을 해당 뉴스 아이템의 img 속성에 저장합니다
                        });

                        await Promise.all(requests); // 모든 요청이 완료될 때까지 기다립니다

                    })
                    .catch((error) => {
                        console.log(error); // 오류가 발생한 경우 오류를 출력합니다
                    })
            }

        },
        activeClass(idx, keyword) {
            console.log(idx)
            console.log(keyword)
            this.search = keyword
            this.pageIndex = 1
            if (idx === undefined && keyword === undefined) {
                this.isActive = false;
                this.getData();
            } else {
                this.index = idx;
                this.isActive = true;
                this.getData(this.search);
            }

        },
        onPageChange(val) {
            this.pageIndex = val;
            this.getData(this.search, this.pageIndex);
        },
        removeTag(value, tag) {
            return value.replace(new RegExp(`<${tag}[^>]*>|</${tag}>`, 'gi'), '');
        },
    },

    created() {
        this.getData();
    }

}
</script>

<style scoped>
.container {
    min-width: 1024px;
    min-height: 650px;
    overflow: hidden;
}

.newscontent {
    position: relative;
    z-index: 1;
    width: 1000px;
    margin: 0 auto;
}

.news_wrap {
    margin-top: 20px;
}

.content_area {
    width: 100%;
}

.tab_category {
    position: relative;
    height: 75px;
}

.list {
    display: flex;
    padding-top: 17px;
    text-align: center;
    justify-content: center;
}

.list a {
    display: block;
    padding: 10px 9px 10px 9px;
    color: #777;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    white-space: nowrap;
}

.list .menu::before {
    display: inline-block;
    width: 1px;
    height: 14px;
    margin: -1px 9px 1px 0;
    background: #e3e3e3;
    vertical-align: middle;
    content: '';
}

.news_wrap .news_list {
    overflow: hidden;
    padding-bottom: 5px;
    border-bottom: 1px solid #d7d7d7;
}

.news_list li {
    display: inline-block;
    padding: 15px 0;
    border-top: 1px solid #f2f2f2;

}

.news_list .thumb {
    background-color: #eaeef4;
    position: relative;
    float: left;
    overflow: hidden;
    width: 140px;
    max-height: 150px;
    min-height: 90px;
    margin-right: 18px;
}

.news_list .thumb img {
    width: 100%;
    height: 100%;
}

.news_list .text .news_title {
    display: inline-block;
    max-width: 100%;
    margin: 5px 0 4px;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: -1px;
}

.news_list .text p {
    color: #5e5e5e;
    line-height: 19px;
}

.news_list .news_date .time {
    margin: -1px 8px 1px 4px;
    vertical-align: middle;
}

.pageable {
    padding: 25px 0;
    text-align: center;
}

.pageable a {
    display: inline-block;
    min-width: 16px;
    height: 26px;
    padding: 0 5px;
    border: 1px solid #fff;
    color: #666;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 26px;
    vertical-align: top;
    text-decoration: none;
}

.active {
    color: #255fbe !important;
}

.currentPage {
    color: #255fbe !important;
    border-color: #9fbaec !important;
    ;
    font-weight: bold;
}
</style>