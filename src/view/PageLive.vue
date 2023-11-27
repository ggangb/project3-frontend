<template>
    <div class="container">
        <div class="widget">
            <iframe src="https://www.scorebat.com/embed/livescore/?token=MTMwNjg3XzE3MDEwNTMxOTVfMjM2MDQ4MDQ4MzRlNzAxZmYwNjZjMzE1NGI4MWEwMGYyOWNkNjBkMw==" frameborder="0" width="600" height="760" allowfullscreen allow='autoplay; fullscreen' style="width:100%;height:760px;overflow:hidden;display:block;" class="_scorebatEmbeddedPlayer_"></iframe>
        </div>
    </div>
  </template>
  
  
  <script>
  (function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://www.scorebat.com/embed/embed.js?v=arrv'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));
  export default {
    data() {
      return {
        
      }
    },
    methods: {
     
    },
    mounted() {
  
  
      },
  }
  
  </script>
  
  <style scoped>
    .container {
    max-width: 1024px;
    min-height: 650px;
    overflow: hidden;
    margin: 0 auto;
    }
    .widget {
        margin-top: 30px;
    }
  </style>
    