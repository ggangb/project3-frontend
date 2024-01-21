<template>
    <div class="container">
        <div class="inner">
            <div class="content">
                <div class="best_board">
                    <div class="best_inner">
                        <ul>
                            <li class="tab">추천글</li>
                        </ul>
                        <div class="best_board_form">
                            <div class="best_board_content">
                                <ul class="best_left">
                                    <li v-for="(rank, idx) in rankData.slice(0, 5)" :key="idx">
                                        <span></span>
                                        <router-link :to="`view/${rank.idx}`">[ 추천 : {{ rank.recommend }} ] "{{
                                            rank.title }}</router-link>
                                    </li>
                                </ul>
                                <ul class="best_right">
                                    <li v-for="(rank, idx) in rankData.slice(5, 10)" :key="idx">
                                        <span></span>
                                        <router-link :to="`view/${rank.idx}`">[ 추천 : {{ rank.recommend }} ] "{{
                                            rank.title }}</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="board_form">
                    <div class="board_content">
                        <a class="board_tab">
                            <h1 @click="refreshPage" class="tab">커뮤니티</h1>
                        </a>
                        <div class="tab_category">
                            <ul class="category_list">
                                <li @click="refreshPage"><span class="material-symbols-outlined">
                                        house
                                    </span></li>
                                <li class="category_item" v-for="category in tabList" :key="category.name">
                                    <a @click="changeCategories(category.id)">{{ category.name }}</a>
                                    <div v-if="category.subCategories" class="new_tab">
                                        <ul class="new_category_list">
                                            <li @click="changeCategories(category.id, subCategory.id)"
                                                class="new_category_item" v-for="subCategory in category.subCategories"
                                                :key="subCategory"> {{
                                                    subCategory.name }}</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- 
                        <select @change="onSortChange($event)">
                            <option value="" disabled selected>정렬 기준</option>
                            <option v-for="(header, index) in headerList" :value="contentKeyList[index]"
                                :key="'select-' + index">{{ headerList[index] }}</option>
                        </select>
                        <select @change="onSortDirectionChange($event)">
                            <option value="" disabled selected>정렬 방향</option>
                            <option value="desc">내림차순</option>
                            <option value="asc">오름차순</option>
                        </select> -->
                        <router-link :to="{ name: 'PageWrite', state: { tab: categoriesId, subTab: subCategoriesId } }">
                            <div class="btn"><button>글쓰기</button></div>
                        </router-link>
                        <table class="board_list">
                            <colgroup>
                                <col width="8%">
                                <col width="*%">
                                <col width="15%">
                                <col width="20%">
                                <col width="5%">
                                <col width="5%">
                            </colgroup>
                            <thead style="display: table-header-group">
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>아이디</th>
                                    <th>날짜</th>
                                    <th>조회</th>
                                    <th>추천</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="!empty">
                                    <tr v-for="(contents, idx) in content" :key="idx">
                                        <td>{{ contents.idx }}</td>
                                        <router-link :to="{ name: 'PageView', params: { contentId: contents.idx } }">
                                            <td class="desc">{{ contents.title }}</td>
                                        </router-link>
                                        <td>{{ contents.username }}</td>
                                        <td>{{ contents.date }}</td>
                                        <td>{{ contents.view }}</td>
                                        <td>{{ contents.recommend }}</td>
                                    </tr>
                                </template>

                                <template v-else>
                                    <tr>
                                        <td colspan="6">
                                            <div>
                                                <h1>해당 탭에 작성된 글이 없습니다.</h1>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <form v-on:submit.prevent="searchData">
                            <div class="search">
                                <div class="input-wrapper">
                                    <input class="search_input" type="text" v-model="searchKeyword" />
                                    <button class="search_btn"></button>
                                </div>
                                <select class="search_select" name="search_option" v-model="searchType">
                                    <option value="title_content">제목+내용</option>
                                    <option value="title">제목</option>
                                    <option value="content">내용</option>
                                    <option value="username">작성자</option>
                                    <option value="comment">댓글내용</option>
                                </select>
                            </div>
                        </form>
                        <PageNation :currentPage="page.page" :totalPages="totalPages" :pageChange="onPageChange" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import boardService from '../service/board.service';
import eventBus from '../common/EventBus';
import PageNation from '@/components/PageNation.vue';

export default {
    components: { PageNation },
    data() {
        return {
            content: [],
            categoriesId: '',
            subCategoriesId: '',
            empty: false,
            rankData: [],
            tabList: [],
            searchType: 'title_content',
            searchKeyword: '',
            headerList: ["날짜", "추천수", "조회수"],
            contentKeyList: ['date', 'recommend', 'view'],
            sortHeader: 'date',
            sortDirection: 'desc',
            totalPages: 0,
            page: {
                page: 0,
                size: 5,
                sort: 'date,desc'
            }
        }
    },
    computed: {

    },
    methods: {
        refreshPage() {
            this.page = {
                page: 0,
                size: 5,
                sort: 'date,desc'
            }
            this.search();
        },
        search() {
            console.log('page' + this.page.page)
            boardService.getCoummunityBoard(this.page).then(
                (response) => {
                    console.log(response)
                    this.content = response.data.content;
                    this.totalPages = response.data.totalPages;
                    this.page.page = response.data.number;
                })
        },
        searchData() {
            const searchData = {
                type : this.searchType,
                keyword : this.searchKeyword
            }
            console.log(searchData)
            boardService.searchContent(this.page,searchData).then(
                (res) => {
                    console.log(res);
                    this.content = res.data.content;
                    this.totalPages = res.data.totalPages;
                    this.page.page = res.data.number;
                }
            )
            
        },
        changeCategories(categories, subCategories) {
            this.categoriesId = categories;
            this.subCategoriesId = subCategories;
            console.log(this.categoriesId)
            console.log(this.subCategoriesId)
            if (categories && !subCategories) {
                boardService.getchangeContent(this.page, categories).then(
                    (res) => {
                        console.log(res);
                        if (res.data === '') {
                            this.empty = true;
                        } else {
                            this.empty = false;
                            this.content = res.data.content;
                            this.totalPages = res.data.totalPages;
                            this.page.page = res.data.number;
                        }
                    }
                )
            } else if (categories && subCategories) {
                boardService.getchangeContent(this.page, subCategories).then(
                    (res) => {
                        console.log(res);
                        if (res.data === '') {
                            this.empty = true;
                        } else {
                            this.empty = false;
                            this.content = res.data.content;
                            this.totalPages = res.data.totalPages;
                            this.page.page = res.data.number;
                        }
                    }
                )
            }



        },
        onPageChange(value) {
            console.log(value)
            this.page.page = value.requestPage;
            this.search();
        },
        // onSortChange(event) {
        //     this.sortHeader = event.target.value;
        //     this.page.sort = this.sortHeader + ',' + this.sortDirection;
        //     this.search();
        // },
        // onSortDirectionChange(event) {
        //     this.sortDirection = event.target.value;
        //     this.page.sort = this.sortHeader + ',' + this.sortDirection;
        //     this.search();
        // },
        getTab() {
            boardService.getTab()
                .then(res => {
                    console.log(res)
                    this.tabList = res.data;

                })
        }

    },
    created() {

        boardService.getRank().then(
            (response => {
                console.log(response)
                this.rankData = response.data;

            })
        )
        boardService.getCoummunityBoard(this.page).then(
            (response) => {
                console.log(response)
                this.content = response.data.content;
                this.totalPages = response.data.totalPages;
                this.page.page = response.data.number;
            },
            error => {
                this.content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                if (error.response && error.response.status === 403) {
                    eventBus.dispatch("logout");
                    this.$router.push('/');
                }
            }
        ),
            this.getTab();
    },

}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

a:hover {
    text-decoration: underline;
}

table {
    border-collapse: none;
}

.tab {
    margin-bottom: 15px;
    font-size: 20px;
}

.board_list tr {
    background-color: #f7f7f7;
}

.container {
    
    width: 1024px;
    min-height: 800px;
    margin: 0 auto;
    background: #fff;
}

.inner {
    min-height: 450px;
    margin: 0 10px 10px;
    text-align: left;
}

.best_board {
    margin: 10px 0 0;
    overflow: hidden;
}

.best_inner {
    overflow: hidden;
}

.best_board_form {
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-top: none;
    height: 135px;
    overflow: hidden;
}

.best_left {
    float: left;
    width: 48%;
    padding-right: 2%;
}

.best_right {
    float: left;
    width: 48%;
    padding-left: 2%;
}

.best_board_content {
    display: block;
}

.best_board_content li {
    line-height: 2.0em;
    margin-left: 10px;
    font-size: small;
    text-indent: 30px;
    background: url("@/assets/recommend_FILL0_wght500_GRAD0_opsz20.png") 3px no-repeat;
}

.btn {
    position: absolute;
    right: 0;
    top: 10px;
}

.tab_category {
    background-color: #f7f7f7;
    margin-bottom: 15px;
    text-align: center;
    display: block;
}

.category_list {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.category_item {
    padding: 10px;
    float: left;
}

.new_tab {
    display: none;

}

.category_item :hover+.new_tab {
    font-size: 10px;
    display: block;
    position: absolute;
    background: #f7f7f7;
    ;
    border: 1px solid #999;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
}

.new_tab:hover {
    font-size: 10px;
    display: block;
    position: absolute;
    background: #f7f7f7;
    ;
    border: 1px solid #999;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
}

.new_category_item:hover {
    font-weight: bold;
}

.new_category_item {
    padding: 10px;
    display: inline-block;
}

.board_tab {
    display: inline-block;
}

.board_form {
    position: relative;
    width: 100%;
    margin-top: 0;
}

.board_content {
    height: auto;
    padding: 10px 0 20px;
    margin-top: 0;
    border: none;
}

.board_list {
    width: 100%;
}

thead tr th {
    text-align: center;
    line-height: 2.5em;
    padding-top: 1px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    font-weight: 600;
}

tbody tr td {
    text-align: center;
    line-height: 2.5em;
    padding-top: 1px;
    border-bottom: 1px solid #dddddd;
    background: #ffffff;
}

tbody tr td.desc {
    width: 540px;
    max-width: 540px;
    overflow: hidden;
    padding-left: 10px;
    text-align: left;
}

.search {
    margin-top: 15px;
    position: relative;
    display: inline-block;
}

.search_input {
    width: 350px;
    font-size: 14px;
    border-radius: 4px;
    padding-right: 30px;
}

.search_btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 34px;
    background: url("@/assets/search_FILL0_wght400_GRAD0_opsz24.png") no-repeat center center;
    background-size: cover;
    border: none;
    cursor: pointer;
}



.search_input:focus {
    outline: none;
    border-color: #007bff;
}

.search_select {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    cursor: pointer;
}

.search_select option {
    font-size: 14px;
    color: #333;
    background-color: #fff;
}

.input-wrapper {
    position: relative;
    display: inline-block;
}

.search_input,
.search_select {
    height: 36px;
    box-sizing: border-box;
    padding: 8px;
    border: 1px solid #ccc;
}
</style>
  