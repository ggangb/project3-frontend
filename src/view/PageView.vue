<template>
	<div>{{ $route.params.contentId }}</div>
    <p v-html="content"></p>
</template>

<script>
import boardService from '@/service/board.service';
export default {
    methods: {

        
    },
    mounted() {
        var contentId = this.$route.params.contentId
        boardService.getContent(contentId).then(
            (res) => {
                console.log(res)
                this.content = res.data.content
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

<style>

</style>