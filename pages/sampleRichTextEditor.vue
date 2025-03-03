<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue';
// import { QuillEditor } from '@vueup/vue-quill';
// import 'quill/dist/quill.snow.css';


/* パンクズとかサイドメニューなどお決まりの部分 ***************/
definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});
const PAGE_TITLE = "リッチテキストエディタサンプル";
useHead({
  title: PAGE_TITLE
});
const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];
/*******************************************************/


const content = ref('Welcome <span style="color: red;" contenteditable="false">to</span> TinyMCE!');


// プレーンテキスト（HTMLタグを除去）
const plainTextContent = computed(() => {
  const div = document.createElement('div');
  div.innerHTML = content.value;
  return div.textContent || div.innerText || "";
});


</script>

<template>
  <!-- パンくずコンポーネント -->
  <Breadcrumbs :breadcrumbs="breadcrumbs" />

  <h1 class="page-title">{{ PAGE_TITLE }}</h1>


  <main id="sample">
    <Editor
      v-model="content"
      api-key="dlep74w28pkncgvrdo442lepms4s41xau00vjr41djsmux8i"
      :init="{
        toolbar_mode: 'sliding',
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' }
        ],
        ai_request: (_request: any, respondWith: any) => {
          return respondWith.string(async () => {
            throw new Error('See docs to implement AI Assistant');
          });
        }
      }"
    />
  </main>

  <p>入力内容: {{ plainTextContent }}</p>

<hr />

<!--
<div>
    <QuillEditor v-model="content" theme="snow" />
</div>
<p>入力内容: {{ content }}</p>
-->  

</template>

<style scoped>
</style>