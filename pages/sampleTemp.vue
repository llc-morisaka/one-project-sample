<script setup lang="ts">
import { inputAreas } from '@/data/inputAreas';
import axios from 'axios';
import type { ReturnJSONVcard } from "@/interfaces";

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


const responseData = ref<ReturnJSONVcard>({
  result: 0,
  prompt: '',
  sectionId: '',
  generatedFileName: ''
});



const allView = async (): Promise<void> => {
  alert("再生成します----");
/*  
  try {
    const response = await axios.post('/samples/vcard',
    {
      textAreaVal: "aaaaaa",
      sectionId: "bbbbbbb",
      generatedFileName: "cccccc"
    },
    {
      headers: {
        "Accept": "application/json"
      },
    });

    console.log('返ってきた値群:', response.data)
    responseData.value = response.data;

  } catch (error: any) {
    if (error.response) {
    // サーバーがステータスコードでエラーを返した場合
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
    // リクエストが送信されたが、レスポンスがない場合
      console.error('No response received:', error.request);
    } else {
    // リクエストの設定中にエラーが発生した場合
    console.error('Error setting up request:', error.message);
    }
  } finally {
  //　成否に関わらず必ずやる処理があればココ

  }
*/
};

const resetAll = () => {
  alert("stab");
}


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
    <div class="allData">

    </div>
    <!-- ボタン -->
    <div class="button-group">
      <button class="btn btn-recreate" @click="allView()">全部の入力を表示</button>
      <button class="btn btn-reset" @click="resetAll()">一括リセット</button>
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
