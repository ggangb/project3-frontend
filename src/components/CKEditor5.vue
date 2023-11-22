<template>
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
      editorData: '',
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|','fontBackgroundColor', 'fontColor', 'fontSize', 'bold', 'italic', '|', 'alignment', 'bulletedList', 'numberedList', 'indent', 'outdent', '|', 'imageUpload', 'insertTable', 'link', '|', 'undo', 'redo' ],
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ],
        },
        image: {
            resize: true,
            toolbar: [ 'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:inline', 'imageStyle:side']
        },
        extraPlugins: [ function(editor) {editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
          return new UploadAdapter( loader );
      }}]
      }
    }
  },
  methods: {
  }
    }
</script>

<style>
/* style scoped 사용하지말것 */
.ck-editor__editable {
  min-height: 500px;
}
</style>