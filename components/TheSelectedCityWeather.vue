<script setup lang="ts">
// このコンポーネントでは敢えて、piniaからではなくpropsでデータを受け取ります
import type { City } from "@/interfaces";
import axios from 'axios';

const config = useRuntimeConfig(); 

const props = defineProps<City>();

const data = ref<any>(null);

const pending = ref(false);
const noServerError = ref(true);
const authFailed = ref(false);
// エラーメッセージを格納する変数
const errorMessage = ref<string | null>(null);

const selectCityId = ref(props.id);
const selectCityName = ref(props.name);
const selectCityQ = ref(props.q);


// API からデータを取得する関数
const fetchData = async () => {
  
  try {
    pending.value = true; // ローディング開始
    errorMessage.value = null; // エラーメッセージのリセット

    // データを取得 (例として JSONPlaceholder API を使用)
    const res = await axios.get(config.public.weatherInfoUrl, {

      headers: {
//        "Authorization": "token-here",
        "Accept": "application/json"
      },

      params: {
        lang: "ja",
        q: selectCityQ.value,
        appid: config.public.weathermapAppid
      }
    });

    data.value = res.data;
  } catch (error: any) {
    errorMessage.value = error.message || 'データ取得中にエラーが発生しました';
  } finally {
    pending.value = false; // ローディング終了
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <h1>お天気データの取得例</h1>

    <!-- ローディング中 -->
    <div v-if="pending">データを取得中です...</div>

    <!-- エラーメッセージ -->
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- データ表示 -->
    <div v-if="data">
      <h2>都市: {{ data.name }}</h2>
      <p>天気: {{ data.weather[0].description }}</p>
      <p>気温: {{ (data.main.temp - 273.15).toFixed(1) }}°C</p>
    </div>    
    
    <!--
    <div v-else-if="data">
      <h2>データ</h2>
      <pre>{{ data }}</pre>
    </div>
  -->


  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>