<template>
    <div class="paging">
        <div class="pagable">
            <a class="prev" @click="onPageChange(currentPage - 1)">이전</a>
            <!-- 페이지 번호를 출력하는 부분 -->
            <a v-for="(paging, index) in pages" :key="index" v-on:click="onPageChange(paging - 1)"
                :class="paging - 1 === currentPage ? 'currentPage' : ''">{{ paging }}</a>
            <a class="next" @click="onPageChange(currentPage + 1)">다음</a>
        </div>
    </div>
</template>

<script>


export default {
    name: 'PageNation',
    props: ['currentPage', 'totalPages', 'pageChange'],
    data() {
        return {

        }
    },
    computed: {
          // 현재 페이지와 전체 페이지 수에 따라 출력할 페이지 번호들을 계산하는 computed 속성
        pages: function () {
            const list = [];
            for (let index = this.startPage; index <= this.endPage; index += 1) { list.push(index); }
            return list;
        },
         // 현재 페이지 기준으로 시작 페이지를 계산하는 computed 속성
        startPage() {
            return parseInt(this.currentPage / 5) * 5 + 1;
        // 현재 페이지 기준으로 끝 페이지를 계산하는 computed 속성
        },
        endPage() {
            let lastPage = parseInt(this.currentPage / 5) * 5 + 5;
            return lastPage <= this.totalPages ? lastPage : this.totalPages;
        }
    },
    methods: {
        // 페이지 변경 시 호출되는 메소드
        onPageChange(val) {
            console.log(val)
            if (val < 0) {
                alert('첫 페이지 입니다.');
                return;
            }
            if (val >= this.totalPages) {
                alert('마지막 페이지입니다.');
                return;
            }

            const param = {
                requestPage: val,
            };

            this.pageChange(param);
        }
    }
}
</script>

<style scoped>
.paging {
    display: block;
    max-width: 1024px;
    padding: 25px 0;
    
}
.pagable {
    text-align: center;
}

.currentPage {
    background: #eeeeed;
}

.pagable a {
    display: inline-block;
    min-width: 12px;
    height: 24px;
    padding: 0 6px;
    border: 1px solid transparent;
    border-radius: 2px;
    letter-spacing: -1px;
}

.prev , .next {
    font-size: small;
    margin: 0 20px;
}

.paging.compage {
    max-width: 300px;
    font-size: 10px;
    vertical-align: middle;
    padding: 0;
}

.paging.compage .pagable a {
    display: unset;
}

</style>