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
                        <router-link to="/write"><div class="btn"><button>글쓰기</button></div></router-link>
                        <table class="board_list">
                            <colgroup>
                                <col width="8%">
                                <col width="*%">
                                <col width="15%">
                                <col width="11%">
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
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>0000</td>
                                    <td class="desc">제목</td>
                                    <td>아이디</td>
                                    <td>일시</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import boardService from '../service/board.service';
import eventBus from '../common/EventBus';

export default {
    data() {
      return {
        content: "",
      }
    },
    computed: {
    
  },
  mounted() {
    boardService.getCoummunityBoard().then(
        (response) => {
            console.log(response)
            this.content = response.data;
        },
        error => {
            this.content = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message || 
                error.toString();

            if (error.response && error.response.status === 403) {
                eventBus.dispatch("logout");
            }
        }
    )
  },
    methods: {
    
  }
   
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
    }
  </style>
  