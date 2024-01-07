<template>
  <!-- ck-editor 컴포넌트를 템플릿에 추가하고, v-model을 이용하여 에디터의 내용을 양방향으로 바인딩합니다. -->
  <!-- editor 속성은 CKEditor5의 ClassicEditor를 사용합니다. -->
  <!-- editorConfig 속성은 에디터의 구성을 설정합니다. -->
  <ck-editor v-model="editorData" :editor="editor" :config="editorConfig" />
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../service/UploadAdapter';

export default {
  components: {
    'ck-editor': CKEditor.component
  },
  data() {
    return {
      // 에디터의 내용을 저장하는 데이터 속성입니다.
      editorData: '',
      // ClassicEditor를 에디터로 사용합니다.
      editor: ClassicEditor,
      // 에디터의 구성을 설정합니다.
      editorConfig: {
        // 툴바에 표시할 기능들을 설정합니다.
        toolbar: ['heading', '|', 'fontBackgroundColor', 'fontColor', 'fontSize', 'bold', 'italic', '|', 'alignment', 'bulletedList', 'numberedList', 'indent', 'outdent', '|', 'imageUpload', 'insertTable', 'link', '|', 'undo', 'redo'],
        // 테이블 관련 툴바 기능들을 설정합니다.
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
        },
        // 이미지 관련 설정을 지정합니다.
        image: {
          resize: true,
          toolbar: ['imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:inline', 'imageStyle:side']
        },
        // 업로드 어댑터를 추가하기 위해 extraPlugins를 사용합니다.
        // FileRepository의 createUploadAdapter 함수를 오버라이딩하여 업로드 어댑터를 지정합니다.
        extraPlugins: [function (editor) {
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
          }
        }]
      }
    }
  },
  methods: {
    // 필요한 경우 메서드를 추가
  }
}
</script>

<style>
/* style scoped 사용하지말것 */
.ck-editor__editable {
  min-height: 500px;
}
</style>