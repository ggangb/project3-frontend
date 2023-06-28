<template>
  <div class="container">
    <div class="tab">
      <h2>커뮤니티</h2>
    </div>
    <div>
      <form v-on:submit.prevent="write" class="write_form">
        <div class="title">
          <input v-model="title" class="write_title" type="text" placeholder="제목" required>
        </div>
        <div class="">
          <CKEditor/>

        </div>
        <div class="btn">
          <button class="cancel">취소</button>
          <button type="submit" class="success">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import CKEditor from '../components/CKEditor5.vue';
import BoardService from '../service/board.service';
import tokenService from '@/service/token.service';

export default {
  components: {
    CKEditor
  },
  data() {
    return {
      title: '',
      editorData: this.editorData,
      username: '',
      date: ''
    }
  },
  methods: {
    write() {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var hours = ('0' + today.getHours()).slice(-2);
      var minutes = ('0' + today.getMinutes()).slice(-2);

      var dateString = year + '-' + month + '-' + day + " " + hours + ":" + minutes;
      
      const writeData = {
        title: this.title,
        editorData: this.editorData,
        username: tokenService.getUserName(),
        date: dateString
      }
      console.log(writeData)
      BoardService.writeSubmit(writeData)
      .then(res => {
        console.log(res)
      })
    }
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
  