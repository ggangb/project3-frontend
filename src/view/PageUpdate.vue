<template>
  <div class="container">
    <div class="tab">
      <h2>커뮤니티</h2>
    </div>
    <div class="write_form">
      <form v-on:submit.prevent="update" >
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
          <input v-model="this.content.title" class="write_title" type="text" placeholder="제목" required>
        </div>
        <div class="">
          <CKEditor5 v-model="this.content.content" />

        </div>
      </form>
      <div class="btn">
        <button @click="goBack" class="cancel">취소</button>
        <button @click="update()" class="success">수정</button>
      </div>
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
      tab: null,
      subTab: null,
      selectedTab: 'default',
      tabList: [],
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
            this.tab = res.data.categories.id;
            console.log(this.tab)
            if(!res.data.subCategories) {
              this.selectedTab = this.tab;
            } else {
              this.subTab = res.data.subCategories.id;
              this.selectedTab = [this.tab, this.subTab];
            }
            console.log(this.tab)
            console.log(this.subTab)
          }
        )
    },
    goBack() {
      this.$router.go(-1);
    },
    getTab() {
      boardService.getTab()
        .then(res => {
          console.log(res)
          this.tabList = res.data;

        })
    }
  },
  mounted() {
    this.getUpdate();
    this.getTab();



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