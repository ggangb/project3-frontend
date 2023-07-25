<template>
        <div class="view_form">
            <div class="view_content">
                <div class="title_box">
                    <h2>{{ content.title }}</h2>
                </div>
                <div class="writer_box">
                    <ul>
                        <div class="name_box">
                            <li>{{ content.username }}</li>
                        </div>

                        <div class="data_box">
                            <li>
                                <span>{{ content.date }}</span>
                                <span>조회수 : {{ content.view }}</span>
                                <span>추천수 : {{ content.recommend }}</span>
                            </li>
                        </div>
                    </ul>
                </div>
                <div class="text_box">
                    <div v-html="content.content"></div>
                </div>
                <div class="btn_wrap">
                    <a v-on:click="recommendContent()" class="btn_recommend">추천 : {{ content.recommend }}</a>
                </div>
            </div>
            <div class="btn_prev_next">
                <router-link class="btn_list" to="/community">목록으로</router-link>
                <a v-on:click="prevContent()" class="btn_prev">이전글</a>
                <a v-on:click="nextContent()" class="btn_next">다음글</a>
            </div>
            <div class="comment">
                <div class="comment_info">
                    <span>댓글 00 개</span>
                    <div class="comment_page">
                    </div>
                </div>
               
                <ul class="comment_list">
                    <li class="comment_item">
                        <div>
                            <span>유저아이디</span>
                            <span> 작성시간</span>
                            <span>수정</span>
                            <span>삭제</span>
                        </div>
                        <div>
                            <div>내용</div>
                        </div>
                    </li>
                </ul>
                <div class="com_page">

                </div>
                <div class="comment_editor">
                    <strong>댓글쓰기</strong>
                    <form class="comment_write">
                        <div class="text">
                        <textarea></textarea>
                        <input class="comment_btn" type="submit" value="등록">
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
import boardService from '@/service/board.service';

export default {
    methods: {
        recommendContent() {
            var contentId = this.$route.params.contentId
            boardService.recommend(contentId).then(
                (res) => {
                    console.log(res);
                    alert('추천완료');
                    this.$router.go();
                }
            )
        },
        getContent() {
            this.contentId = this.$route.params.contentId
            boardService.getContent(this.contentId).then(
                (res) => {
                    const cookie = this.$cookies.get('viewCount');
                    console.log(cookie)
                    console.log(res)
                    this.content = res.data
                    this.prev = res.data.prev;
                    this.next = res.data.next;
                    
                }
                )
        },
        prevContent() {
            if(this.prev === null) {
                alert("마지막 글 입니다.");
            }
            this.$router.push({name: "PageView", params : {contentId : this.prev}})

            this.contentId = this.prev;

            this.getContent();

        },
        nextContent() {
            if(this.next === null) {
                alert("첫 글 입니다.");
            }
            this.$router.push({name: "PageView", params : {contentId : this.next}})

            this.contentId = this.next;

            this.getContent();

        }

    },
    mounted() {
        // var contentId = this.$route.params.contentId
        // boardService.getContent(contentId).then(
        //     (res) => {
        //         console.log(res)
        //         this.content = res.data
        //     }
        // )
        this.getContent();

      

    },
    data() {
        return {
            content: '',
            prev: 0,
            next: 0,
            contentId: 0,
        }
    },
}
</script>

<style scoped>
.view_form {
    padding: 30px;
    margin: 0 auto;
    max-width: 1024px;
}

.view_content {
    padding: 10px;
    border: 1px solid #AAAAAA;
    min-height: 700px;
}

.title_box {
    font-size: 25px;
    text-align: left;
}

.writer_box {
    display: block;
    overflow: hidden;
    margin: 10px 0;
    border-top: 1px solid #AAAAAA;
    border-bottom: 1px solid #AAAAAA;
}

.writer_box:before {
    content: "";
    vertical-align: middle;
}

.name_box {
    display: inline-block;
    color: #000000;
    font-weight: 700;
    padding: 9px;
}

.data_box {
    color: #666666;
    float: right;
    padding: 9px;
}

.data_box span {
    margin: 0 10px;
}

.text_box {
    padding: 15px;
    min-height: 530px;
}

.btn_recommend {
    display: inline-block;
    padding: 0 7px 0 30px;
    border: 1px solid #D3D3D3;
    font-size: 12px;
    line-height: 17px;
    background: url("@/assets/recommend_FILL0_wght500_GRAD0_opsz20.png") 7px no-repeat;
    color: #707070;
    cursor: pointer;

}

.btn_wrap {
    width: 100%;
    text-align: center;
    margin: 15px 0;
}

.btn_prev_next {
    margin: 10px;
    position: relative;
    text-align: center;
}

.btn_prev_next .btn_list {
    display: inline-block;
    width: 250px;
    color: black !important;
    text-decoration: none;
}

.btn_prev_next .btn_prev {
    position: absolute;
    left: 0;
}

.btn_prev_next .btn_next {
    position: absolute;
    right: 0;

}

.btn_prev_next a {
    top: 0;
    border: 1px solid #c2c2c2;
    border-top-color: #d2d2d2;
    border-bottom-color: #b1b1b1;
    border-radius: 3px;
    padding: 5px;
    ;
}

.category_btn_com {
font-weight: 800;
  color: white !important;
}

.comment {

}

.comment_info {
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    z-index: 10;
}
.comment_page {
    float: right;
}
.comment_list {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
}
.comment_item{
    position: relative;
    margin: -1px 0;
    padding: 11px 11px 10px 88px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: inherit;
}
.com_page {
    padding: 10px 0 0;
    text-align: center;
}
.comment_editor {
    margin-bottom: 15px;
    padding: 12px 16px 20px;
    background: #fcfcfc;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    border-radius: 8px;
}
.comment_editor textarea {
    background: rgb(255, 255, 255);
    overflow: hidden;
    min-height: 4em;
    height: 49px;
    width: 92%;
    margin-left: 3px;
}
.comment_btn {
    width: 56px;
    height: 56px;
    line-height: 56px;
    margin-left: 10px;
    position: absolute;
}
.comment_editor strong {
    display: block;
    margin: 10px;
}
</style>