<template>
    <div class="container">
        <div class="inner">
            <div class="content">
                <div class="best_board">
                    <div class="best_inner">
                        <ul>
                            <li class="tab">실시간</li>
                        </ul>
                        <div class="best_board_form">
                            <div class="best_board_content">
                                <ul class="best_left">
                                    <li>베스트 글 1</li>
                                    <li>베스트 글 2</li>
                                    <li>베스트 글 3</li>
                                    <li>베스트 글 4</li>
                                    <li>베스트 글 5</li>
                                </ul>
                                <ul class="best_right">
                                    <li>베스트 글 6</li>
                                    <li>베스트 글 7</li>
                                    <li>베스트 글 8</li>
                                    <li>베스트 글 9</li>
                                    <li>베스트 글 10</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="board_form">
                    <div class="board_content">
                        <h1 class="tab">게시판</h1>
                        <select @change="onSortChange($event)">
                            <option value="" disabled selected>정렬 기준</option>
                            <option v-for="(header, index) in headerList" :value="contentKeyList[index]" :key="'select-' + index">{{ headerList[index] }}</option>
                        </select>
                        <select @change="onSortDirectionChange($event)">
                            <option value="" disabled selected>정렬 방향</option>
                            <option value="desc">내림차순</option>
                            <option value="asc">오름차순</option>
                        </select>
                        <router-link to="/write">
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
                                <tr v-for="(contents, idx) in content" :key="idx">
                                    <td>{{ idx + 1 }}</td>
                                    <router-link :to="{ name: 'PageView', params: { contentId: contents.id } }">
                                        <td class="desc">{{ contents.title }}</td>
                                    </router-link>
                                    <td>{{ contents.username }}</td>
                                    <td>{{ contents.date }}</td>
                                    <td>{{ contents.view }}</td>
                                    <td>{{ contents.recommend }}</td>
                                </tr>

                            </tbody>
                        </table>
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
        onPageChange(value) {
            console.log(value)
            this.page.page = value.requestPage;
            this.search();
        },
        onSortChange(event) {
            this.sortHeader = event.target.value;
            this.page.sort = this.sortHeader + ',' + this.sortDirection;
            this.search();
        },
        onSortDirectionChange(event) {
            this.sortDirection = event.target.value;
            this.page.sort = this.sortHeader + ',' + this.sortDirection;
            this.search();
        }

    },
    created() {
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
        )
    },

}
</script>

<style scoped>
.tab {
    margin-left: 15px;
    margin-bottom: 15px;
}

.container {
    width: 100%;
    max-width: 1024px;
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
}

.btn {
    position: absolute;
    right: 0;
    top: 10px;
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
}</style>
  