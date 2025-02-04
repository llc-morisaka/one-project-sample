<script setup lang="ts">


definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "サンプルPDF表示";
useHead({
  title: PAGE_TITLE
});


const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];

const textInputs = ref(["", "", "", ""]);
const handleButtonClick = (index: number) => {
  console.log(`ボタン ${index} が押されました:`, textInputs.value[index - 1]);
};

</script>

<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
 
    <section class="pdf-container">
      <!-- 左側（入力フォーム） -->
      <div class="input-area">
        <div class="input-group" v-for="index in 4" :key="index">
          <textarea v-model="textInputs[index - 1]" placeholder="入力してください"></textarea>
          <button @click="handleButtonClick(index)">送信</button>
        </div>
      </div>

      <!-- 右側（PDF表示） -->
      <div class="pdf-area">
        <iframe 
          src="/documents/sample_document.pdf" 
          frameborder="1">
        </iframe>
        <iframe 
          src="/documents/sample_document2.pdf" 
          frameborder="1">
        </iframe>
      </div>
    </section>  </div>
</template>

<style scoped>
.pdf-container {
  position: relative;
  display: flex;
  gap: 16px;
  margin-top: 35px;
  column-gap: 35px;
}


/* 左側の入力エリア */
.input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

textarea {
  width: 100%;
  height: 80px;
  padding: 8px;
  font-size: 14px;
}

button {
  width: 80px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-left: auto;
}

button:hover {
  background-color: #0056b3;
}

/* 右側のPDFエリア */
.pdf-area {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pdf-area iframe {
  width: 100%;
  height: 300px;
}
</style>
