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
            <div class="btn_wrap" >
                <a v-on:click="recommendContent()" class="btn_recommend" >추천 : {{ content.recommend }}</a>
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
        }

    },
    mounted() {
        var contentId = this.$route.params.contentId
        boardService.getContent(contentId).then(
            (res) => {
                console.log(res)
                this.content = res.data
            }
        )

    },
    data() {
        return {
            content: '',
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
.data_box{
    color: #666666;
    float: right;
    padding: 9px;
}
.data_box span{
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
</style>