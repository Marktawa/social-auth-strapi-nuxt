<template>
  <div class="container">
    <h1>Note Editor</h1>
    <ClientOnly>
      <QuillEditor
        v-model:content="content"
        theme="snow"
        :options="editorOptions"
        content-type="html"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import { ref } from 'vue'

const content = ref('<h2>Start typing your note...</h2><p></p>')

const editorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
    ]
  },
  placeholder: 'Compose an epic...'
}
</script>

<style>
.container {
  width: 80%;
  margin: 2rem auto;
}

.ql-editor {
  min-height: 200px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
}
</style>
