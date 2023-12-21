<template>
  <div class="container">
    <div class="tab">
      <h2>커뮤니티</h2>
    </div>
    <div class="write_form">
      <form v-on:submit.prevent="write" >
        <div class="title">
          <select class="select_tab" v-model="selectedTab">
            <option value="default">탭 선택</option>
            <optgroup v-for="tabs in tabList" :label="tabs.name" :key="tabs.id">
              <option :value="tabs.id" :key="tabs.id">
                {{ tabs.name }}({{ tabs.count }})
              </option>
              <option v-for="subTabs in tabs.subCategories" :value="[tabs.id, subTabs.id]" :key="subTabs.id">
                {{ subTabs.name }}({{ subTabs.count }})
              </option>
            </optgroup>
          </select>
          <input v-model="title" class="write_title" type="text" placeholder="제목" required>
        </div>
        <div class="">
          <CKEditor5 v-model="editorData" />

        </div>
      </form>
      <div class="btn">
       <button  @click="goBack" class="cancel">취소</button>
        <button type="submit" class="success">등록</button>
      </div>
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
      selectedTab: 'default',
      tab: null,
      subTab: null,
      date: '',
      tabList: [],
    }
  },
  methods: {
    write() {
      if (this.editorData === '') {
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
      if (this.selectedTab.length === 0) {
        const writeData = {
          title: this.title,
          content: this.editorData,
          username: tokenService.getUserName(),
          date: dateString,
          categories: {
            id: this.selectedTab
          }
        }
        console.log(writeData)
        BoardService.writeSubmit(writeData)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              alert('글 작성 완료')
              this.goBack();
            }
          })
      } else {
        const writeData = {
          title: this.title,
          content: this.editorData,
          username: tokenService.getUserName(),
          date: dateString,
          categories: {
            id: this.selectedTab[1],
            parentId: this.selectedTab[0]
          }
        }

        console.log(writeData)
        BoardService.writeSubmit(writeData)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              alert('글 작성 완료')
              this.goBack();
            }
          })
      }


    },
    goBack() {
      this.$router.go(-1);
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
    this.tab = history.state.tab;
    this.subTab = history.state.subTab;
    console.log(this.tab);
    console.log( this.subTab);
    if (this.tab && this.subTab) {
      this.selectedTab = [this.tab, this.subTab];
    } else if (!this.tab && !this.subTab){
      this.selectedTab = 'default';
    } else {
      this.selectedTab = this.tab;
      
    }
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
}
</style>
  