<script setup lang="ts">
import axios from 'axios';
definePageMeta({
  middleware: ["loggedin-check"]
});


const data = ref<any>(null);

const pending = ref(false);
const noServerError = ref(true);
const authFailed = ref(false);

// エラーメッセージを格納する変数
const errorMessage = ref<string | null>(null);

const id = ref("12345"); // 初期値

const onButtonClick = async (): Promise<void> => {

  try {
    pending.value = true; // ローディング開始
    errorMessage.value = null; // エラーメッセージのリセット


    const config = {
      headers: {
        'Authorization': 'token-token-token-token', // テキトーな認証トークン
        'Content-Type': 'application/json',       // コンテンツタイプ
      }
    };
    const response = await axios.get(`https://my-json-server.typicode.com/llc-morisaka/my-json/member/${id.value}`, config);

    data.value = response.data; // 取得データを保存

  } catch (error: any) {
    errorMessage.value = error.message || 'データ取得中にエラーが発生しました';
  } finally {
    pending.value = false; // ローディング終了
  }
  
};  


</script>

<template>
  <h1>my-json-serverとgitHubを利用したAPIデータの取得</h1>
  <p>12345~12349 までの数値を入れるとデータが帰ります</p>
  <div>
    <input type="text" v-model="id" name="id"/>
  </div>
  <p>{{ id }}の会員情報を<button v-on:click="onButtonClick()">検索</button></p>


  <div>

    <!-- ローディング中 -->
    <div v-if="pending">データを取得中です...</div>

    <!-- エラーメッセージ -->
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- データ表示 -->
    <div v-else-if="data">
      <h2>データ</h2>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>




