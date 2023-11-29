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
        <div class="board_edit">
            <router-link v-if="content.username === username" class="update" :to="`/community/update/${this.contentId}`">수정</router-link>
            <a v-if="content.username === username" v-on:click="boardDelete(this.postId)" class="delete">삭제</a>
        </div>
        <div class="comment">
            <div class="comment_info">
                <span>댓글 {{ comment.length }} 개</span>
                <div class="comment_page">
                    <PageNation class="compage" :currentPage="page.page" :totalPages="totalPages"
                        :pageChange="onPageChange" />
                </div>
            </div>

            <ul class="comment_list">
                <template v-for="(contents, idx) in comment" :key="idx">
                    <li v-bind:style="{ 'margin-left': (contents.level * 15) + 'px' }" class="comment_item">
                        <div :index="idx" class="upment_info">
                            <span v-if="contents.level > 0" class="and">ㄴ</span>
                            <span class="writer">{{ contents.writer }}</span>
                            <span class="date"> {{ contents.date }}</span>
                            <span class="edit" v-if="contents.writer === username && contents.deleteYn === 'N'" v-on:click="showUpdateModal(idx, contents)">수정</span>
                            <span class="edit" v-if="contents.deleteYn === 'N'" v-on:click="deleteComment(contents.id)">삭제</span>
                            <span class="edit" v-if="contents.deleteYn === 'N'" v-on:click="showModal(idx)">답글</span>
                        </div>
                        <div class="upment_content">
                            <pre v-text="contents.text"></pre>
                        </div>
                        <div class="downment_editor" v-if="modal && index === idx || upmodal && index === idx">
                            <strong v-if="modal">ㄴ 답글쓰기</strong>
                            <strong v-if="upmodal">ㄴ 답글수정</strong>
                            <form v-on:submit.prevent="reCommentWrite(contents.id, postId)" class="comment_write">
                                <div class="text">
                                    <textarea v-if="modal" v-model="text"></textarea>
                                    <textarea v-if="upmodal" v-text="contents.text" v-on:change="changeText($event)"></textarea>
                                    <input class="downment_btn" type="submit" value="등록">
                                </div>
                            </form>
                        </div>
                    </li>
                </template>

            </ul>

            <div class="com_page">
                <PageNation :currentPage="page.page" :totalPages="totalPages" :pageChange="onPageChange" />
            </div>
            <div class="comment_editor">
                <strong>댓글쓰기</strong>
                <form v-on:submit.prevent="upmentWrite" class="comment_write">
                    <div class="text">
                        <textarea v-model="text"></textarea>
                        <input class="comment_btn" type="submit" value="등록">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import boardService from '@/service/board.service';
import tokenService from '@/service/token.service';
import PageNation from '@/components/PageNation.vue';

export default {
    components: { PageNation },
    data() {
        return {
            username: '',
            modal: false,
            upmodal: false,
            index: 0,
            comment: [],
            updateContent: [],
            text: '',
            writer: '',
            date: '',
            updateText: '',
            content: '',
            prev: 0,
            next: 0,
            contentId: 0,
            level: 1,
            postId: '',
            totalPages: 0,
            page: {
                page: 0,
                size: 10,
                sort: 'ref,desc'
            },
        }
    },
    methods: {
        recommendContent() {
            var contentId = this.$route.params.contentId
            boardService.recommend(contentId).then(
                (res) => {
                    console.log(res);
                    alert('추천완료');
                    this.getContent();
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
                    this.postId = res.data.id;
                    console.log(this.page)
                    console.log(this.postId)
                    boardService.getComment(this.page, this.postId).then(
                        (response) => {
                            console.log(response)
                            this.comment = response.data.content;
                            this.totalPages = response.data.totalPages;
                            this.page.page = response.data.number;

                        }
                    )
                }
            )
        },

        onPageChange(value) {
            console.log(value)
            this.page.page = value.requestPage;
            this.getContent();
        },
        prevContent() {
            if (this.prev === null) {
                alert("마지막 글 입니다.");
            }
            this.$router.push({ name: "PageView", params: { contentId: this.prev } })

            this.contentId = this.prev;

            this.getContent();

        },
        nextContent() {
            if (this.next === null) {
                alert("첫 글 입니다.");
            }
            this.$router.push({ name: "PageView", params: { contentId: this.next } })

            this.contentId = this.next;

            this.getContent();

        },
        upmentWrite() {
            var today = new Date();
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            var hours = ('0' + today.getHours()).slice(-2);
            var minutes = ('0' + today.getMinutes()).slice(-2);

            var dateString = year + '-' + month + '-' + day + " " + hours + ":" + minutes;
            const upmentData = {
                text: this.text,
                writer: tokenService.getUserName(),
                date: dateString,
                postId: this.postId,
            }

            console.log(upmentData)
            boardService.upmentSubmit(upmentData)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        alert('댓글 작성 완료')
                        this.getContent();
                        this.text = '';
                    }
                })

        },
        reCommentWrite(id, postId) {
            var today = new Date();
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            var hours = ('0' + today.getHours()).slice(-2);
            var minutes = ('0' + today.getMinutes()).slice(-2);

            var dateString = year + '-' + month + '-' + day + " " + hours + ":" + minutes;

            if (this.modal) {
                const reCommentData = {
                    text: this.text,
                    writer: tokenService.getUserName(),
                    date: dateString,
                    postId: postId,
                    parentnum: id
                }
                console.log(reCommentData)
                boardService.reCommendSubmit(reCommentData)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            alert('댓글 작성 완료')
                            this.getContent();
                            this.text = '';
                            this.modal = false;
                            this.upmodal = false;
                        }
                    })
            } else {
                const reCommentData = this.updateContent
                reCommentData.parentnum = id;
                reCommentData.text = this.updateText;
                console.log(reCommentData)
                boardService.reCommendUpdate(reCommentData)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            alert('댓글 수정 완료')
                            this.getContent();
                            this.text = '';
                            this.modal = false;
                            this.upmodal = false;
                        }
                    })
            }



        },

        changeText() {
            this.updateText = event.target.value;
            console.log(this.updateText)
        },

        showModal(idx) {
            if (this.modal === false) {
                this.upmodal = false;
                this.index = idx;
                this.modal = true;
            } else {
                this.modal = false;
            }


        },
        showUpdateModal(idx, contents) {
            if (this.upmodal === false) {
                this.updateContent = contents
                console.log(contents)
                this.modal = false;
                this.index = idx;
                this.upmodal = true;
            } else {
                this.upmodal = false;
            }


        },
        boardDelete(postId) {
            console.log(postId)
            boardService.deleteBoard(postId)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        alert('글 삭제 완료')
                        this.$router.push("/community");
                    }
                })

        },
        deleteComment(contentId) {
            console.log(contentId)
            boardService.deleteComment(contentId)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        alert('댓글 삭제 완료')
                        this.getContent()

                    }
                })
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
        this.username = tokenService.getUserName();



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

.btn_prev_next,
.board_edit {
    margin: 10px;
    position: relative;
    text-align: center;
}

.board_edit .delete,
.board_edit .update {
    margin: 10px;
    border: 1px solid black;
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

.btn_prev_next a,
.board_edit .delete,
.board_edit .update {
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

.comment {}

.comment_info {
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    height: 30px;
    z-index: 10;
}

.comment_info span {
    vertical-align: middle;
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

.comment_item {
    position: relative;
    margin: -1px 0;
    padding: 11px 11px 10px 25px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: inherit;
}

.upment_info {
    margin-bottom: 20px;
    height: 15px;
}


.upment_info .writer,
.date {
    padding: 0 12px;
}

.upment_info .edit {
    float: right;
    margin: 0 5px;
    font-size: 12px;
}


.upment_content {
    padding: 0 12px;
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

.downment_btn {
    width: 56px;
    height: 35px;
    line-height: 56px;
    margin-left: 10px;
    position: absolute;
}

.downment_editor textarea {
    background: rgb(255, 255, 255);
    overflow: hidden;
    min-height: 4em;
    height: 49px;
    width: 85%;
    margin-left: 3px;
}


.downment_editor {
    margin-bottom: 15px;
    padding: 12px 16px 20px;
    background: #fcfcfc;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    border-radius: 8px;
}

.comment_editor strong {
    display: block;
    margin: 10px;
}
.downment_editor strong {
    display: block;
    margin: 10px;
}
</style>