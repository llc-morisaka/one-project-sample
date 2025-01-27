<script setup lang="ts">
import { cities } from '@/data/city';
import { useSelectedCityStore } from "@/store/SelectedCity";
import { useUserStore } from '@/store/user';
import { useDateTime } from '~/composables/useDateTime';


definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "お天気情報取得";
useHead({
  title: PAGE_TITLE
});

const cityStore = useSelectedCityStore();
const city = cityStore.city; // Pinia から選択済みの都市情報を取得


const userStore = useUserStore();
const loginUser = userStore.user; // Piniaストアからユーザー情報を取得
const nowTime = ref<string>("");
const viewFlg = ref(false); 


const onGetWeather = async (): Promise<any> =>{
  viewFlg.value = false;
  nowTime.value = useDateTime().formatDateTime(false);



  if (city) {
    viewFlg.value = true;
    console.log("開きました");
  } else {
      alert("選択された都市が不明です");
  }
}

const onCloseView = (): void =>{
  viewFlg.value = false;
}

const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: '都市選択', link: 'weather-weatherShow' },
  { text: PAGE_TITLE },
];



</script>

<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
<!--
    <nav id="breadcrumbs">
      <ul>
        <li><NuxtLink v-bind:to="{name: 'index'}">TOP</NuxtLink></li>
        <li><NuxtLink v-bind:to="{name: 'weather-weatherShow'}">都市選択</NuxtLink></li>
        <li>お天気情報取得</li>
      </ul>
    </nav>
  -->
    <section>
      <h1>前のページであなた({{ loginUser?.name }})が選択した都市の情報</h1>
      <div v-if="city">
        <p><strong>ID:</strong> {{ city.id }}</p>
        <p><strong>名前:</strong> {{ city.name }}</p>
        <p><strong>クエリ:</strong> {{ city.q }}</p>
        <!-- ボタンを横並びにする -->
        <div class="button-container">
          <button v-on:click="onGetWeather()">この都市のお天気を表示させます</button>
          <button v-if="viewFlg" v-on:click="onCloseView()">閉じる</button>
        </div>
        <div v-if="viewFlg">
          <h2>あなたが取得した時間：{{ nowTime }}</h2>
        </div>
      </div>
      <div v-else>
        <p>都市が選択されていません。</p>
      </div>
    </section>

    <!-- TheSelectedCityWeather をラップして中央寄せ -->
    <div v-if="viewFlg && city" class="the-selected-city-weather-wrapper">
      <TheSelectedCityWeather
        v-bind:id="city.id"
        v-bind:name="city.name"
        v-bind:q="city.q"
      />
    </div>
  </div>
</template>

<style scoped>
/* 全体の背景とフォント設定 */
body {
  background-color: #f5f5f5; /* 柔らかい背景色 */
  color: #333; /* 読みやすい文字色 */
  font-family: 'Arial', sans-serif; /* クリーンなフォント */
}

/* パンくずリスト */
#breadcrumbs ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

#breadcrumbs li {
  margin-right: 8px;
}

#breadcrumbs li a {
  text-decoration: none;
  color: #007bff; /* リンクカラー */
}

#breadcrumbs li a:hover {
  text-decoration: underline;
}

/* セクションスタイル */
section {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px auto;
  max-width: 750px;
}

/* 見出し */
h1 {
  font-size: 26px;
  margin-bottom: 16px;
  color: #444; /* 柔らかい色調 */
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

/* テキスト */
p {
  font-size: 16px;
  margin: 8px 0;
  line-height: 1.6;
}

/* ボタン */
button {
  background-color: #007bff; /* 主なボタン色 */
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* ホバーカラー */
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* エラー時のスタイル */
.error {
  color: #d9534f; /* 赤色 */
  font-weight: bold;
}

/* 天気情報の表示カード */
.weather-card {
  background-color: #e9f7fe; /* 青みがかった背景色 */
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #007bff;
  margin-top: 16px;
}


/* ボタンを横並びにするスタイル */
.button-container {
  display: flex;
  justify-content: center;
  align-items: center; /* ボタンを垂直方向で中央揃え */
  gap: 8px; /* ボタン間のスペース */
  margin-top: 16px; /* 上に少し余白を追加 */
}

/* TheSelectedCityWeather を囲む要素をセンターに配置 */
.the-selected-city-weather-wrapper {
  display: flex;
  justify-content: center; /* 水平方向に中央寄せ */
  align-items: center; /* 垂直方向に中央寄せ */
  margin-top: 16px; /* 上部に適度な余白 */
  padding: 16px; /* 内側の余白 */
}

</style>