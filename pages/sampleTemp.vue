<script setup lang="ts">
import { inputAreas } from '@/data/inputAreas';

definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "テキストエリアいっぱい表示サンプル";
useHead({
  title: PAGE_TITLE
});


const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];

</script>

<template>
  <div class="page-container">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <h1 class="page-title">テキストエリアコンポーネントサンプル</h1>
    <!-- useFlg が true の要素だけ表示 -->
    <div class="cards-wrapper">
      <FormVcards
        v-for="(vcard, index) in inputAreas.filter(item => item.useFlg)"
        :key="vcard.sectionId + '-' + index"
        :cardTitle="vcard.cardTitle"
        :cardText="vcard.cardText"
        :sectionId="vcard.sectionId"
        :initialText="vcard.initialText"
      />
    </div>
  </div>
  
</template>

<style scoped>
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #eef2f5;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

/* グリッドレイアウトでカードを整列 */
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}
</style>
