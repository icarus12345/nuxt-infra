<script setup>
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import { ClassicEditor } from "ckeditor5";
import { CKEditorConfig } from './config'
import "ckeditor5/ckeditor5.css";
import "~/assets/css/ckeditor.css";
import "~/assets/css/ckeditor-content.css";

const isLayoutReady = ref(false);
const model = defineModel()
const editor = ClassicEditor;

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  return CKEditorConfig;
});

onMounted(() => {
  isLayoutReady.value = true;
});
</script>
<template>
  <div>
    <Ckeditor
      v-if="editor && config"
      v-model="model"
      :editor="editor"
      :config="config"
    />
  </div>
</template>
