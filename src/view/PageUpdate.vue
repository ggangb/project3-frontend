<template>
  <div class="container">
    <div class="tab">
      <h2>커뮤니티</h2>
    </div>
    <div>
      <form v-on:submit.prevent="update" class="write_form">
        <div class="title">
          <input v-model="this.content.title" class="write_title" type="text" placeholder="제목"  required>
        </div>
        <div class="">
          <CKEditor5 v-model="this.content.content"  />

        </div>
        <div class="btn">
          <router-link to="/community"><button class="cancel">취소</button></router-link>
          <button type="submit" class="success">수정</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import CKEditor5 from '../components/CKEditor5.vue';
import boardService from '../service/board.service';

export default {
  components: {
    CKEditor5
  },
  data() {
    return {
      content: [],
      title: '',
      editorData: this.editorData,
      username: '',
      date: '',
    }
  },
  methods: {
    update() {
      console.log(this.content.title)
      console.log(this.content.content)
      console.log(this.content)
      boardService.updateBoard(this.content)
        .then(
          res => {
            console.log(res)
            if (res.status === 200) {
                        alert('글 수정 완료')
                        this.$router.push("/community");
                    }
          }
        )
    },
    getUpdate() {
      var contentId = this.$route.params.contentId
      boardService.getContent(contentId)
        .then(
          res => {
            console.log(res);
            this.content = res.data; 
          }
        )
    }
  },
  mounted() {
        this.getUpdate();


    },
}

</script>

<style scoped>
.note-editable {
  height: 400px;
}

.write_form {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.title {
  padding: 15px;
}

.write_title {
  width: 900px;
  height: 20px;
  font-size: 15px;
  display: block;
  margin: 0 auto;
}

.container {

  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  background: #fff;

}


.btn {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.btn button {
  width: 100px;
  height: 30px;
  margin: 20px;
}</style>
  