<template>
  <div class="container">
    <div class="tab">
      <h2>커뮤니티</h2>
    </div>
    <div>
      <form v-on:submit.prevent="write" class="write_form">
        <div class="title">
          <select class="select_tab" v-model="selectedTab">
            <optgroup v-for="tabs in tabList" :label="tabs.name" :key="tabs.id">
              <option :value="[tabs]" :key="tabs.id">
                {{ tabs.name }}({{ tabs.count }})
              </option>
              <option v-for="subTabs in tabs.subCategories" :value="[tabs,subTabs]" :key="subTabs.id">
                {{ subTabs.name }}({{ subTabs.count }})
              </option>
            </optgroup>
          </select>
          <input v-model="title" class="write_title" type="text" placeholder="제목" required>
        </div>
        <div class="">
          <CKEditor5 v-model="editorData"/>

        </div>
        <div class="btn">
          <router-link to="/community"><button class="cancel">취소</button></router-link>
          <button type="submit" class="success">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import CKEditor5 from '../components/CKEditor5.vue';
import BoardService from '../service/board.service';
import tokenService from '@/service/token.service';

export default {
  components: {
    CKEditor5
  },
  data() {
    return {
      title: '',
      username: '',
      selectedTab: [],
      date: '',
      tabList: [],
    }
  },
  methods: {
    write() {
      if(this.editorData === '') {
        alert('내용을 입력하세요.');
        return
      }

      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var hours = ('0' + today.getHours()).slice(-2);
      var minutes = ('0' + today.getMinutes()).slice(-2);

      var dateString = year + '-' + month + '-' + day + " " + hours + ":" + minutes;
      console.log(this.selectedTab)
      if(this.selectedTab.length === 1) {
        const writeData = {
        title: this.title,
        content: this.editorData,
        username: tokenService.getUserName(),
        date: dateString,
        categories : {
          id : this.selectedTab[0].id,
          name: this.selectedTab[0].name
        }
      }
        console.log(writeData)
        BoardService.writeSubmit(writeData)
        .then(res => {
          console.log(res)
          if(res.status === 200) {
            alert('글 작성 완료')
            this.$router.push("/community");
          }
        })
      } else {
        const writeData = {
        title: this.title,
        content: this.editorData,
        username: tokenService.getUserName(),
        date: dateString,
        categories : {
          id : this.selectedTab[1].id,
          name: this.selectedTab[1].name,
          parentId: this.selectedTab[0].id
        }
      }
       
      console.log(writeData)
      BoardService.writeSubmit(writeData)
      .then(res => {
        console.log(res)
        if(res.status === 200) {
          alert('글 작성 완료')
          this.$router.push("/community");
        }
      })
      }

     
    },
    getTab() {
      BoardService.getTab()
    .then(res => {
      console.log(res)
      this.tabList = res.data;
      
    })
    }
  },
  created() {
   this.getTab();
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
  width: 970px;
}

.write_title {
  width: 840px;
  height: 20px;
  font-size: 15px;
  display: block;
  float: right;
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
.select_tab {
  height: 25px;
  width: 120px;
}

.btn button {
  width: 100px;
  height: 30px;
  margin: 20px;
}</style>
  