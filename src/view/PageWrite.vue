<template>
  <div class="container">
    <div class="tab">
      <h2>커뮤니티</h2>
    </div>
    <div>
  <form class="write_form">
    <div class="title">
      <input class="write_title" type="text" placeholder="제목">
    </div>
  <div class="">
    <CKEditor />
    
</div>
<div class="btn">
  <button class="cancel">취소</button>
  <button class="success">등록</button>
</div>
</form>
</div>
</div>
</template>


<script>
import CKEditor from '../components/CKEditor5.vue';

  export default {
    components: {
      CKEditor
    }
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

.ql-editro {
  background: white;
  min-height: 500px;
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
}
  </style>
  