<template>
    <div>커뮤니티</div>
    <div>커뮤니티</div>
    <div>커뮤니티</div>
    <h2>커뮤니티</h2>
</template>


<script>
import boardService from '../service/board.service';
import eventBus from '../common/EventBus';

export default {
    data() {
      
    },
    computed: {
    
  },
  mounted() {
    boardService.getCoummunityBoard().then(
        response => {
            console.log(response)
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
    
  </style>
  