<template>
  <div class="container">
    <div class="spot">
      <div class="home_spot">
      </div>
    </div>
  </div>
</template>

<script>
const api_url = "http://localhost:3000/news";
export default {
  name: 'HelloWorld',
  methods: {
    getData() {
      this.$axios
        .get(api_url
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
  }
  ,mounted() {
    this.getData();
  }
};
</script>

<style scoped>
 .home_spot {
  content: '';
    display: block;
    height: 11px;
    background-color: #eff2f8;
    border-bottom: 1px solid #dfe3ec;
 }
</style>
