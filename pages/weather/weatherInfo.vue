<script setup lang="ts">
import { cities } from '@/data/city';
import { useSelectedCityStore } from "@/store/SelectedCity";
import { useUserStore } from '@/store/user';
import { normalizeClass } from 'vue';
import { useDateTime } from '~/composables/useDateTime';


definePageMeta({
	layout: "weather",
  middleware: ["loggedin-check"]
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




</script>

<template>
	<nav id="breadcrumbs">
		<ul>
			<li><NuxtLink v-bind:to="{name: 'index'}">TOP</NuxtLink></li>
			<li><NuxtLink v-bind:to="{name: 'weather-weatherShow'}">都市選択</NuxtLink></li>
			<li>お天気情報取得</li>
		</ul>
	</nav>

  <section>
    <h1>前のページであなた({{ loginUser?.name }})が選択した都市の情報</h1>
    <div v-if="city">
      <p><strong>ID:</strong> {{ city.id }}</p>
      <p><strong>名前:</strong> {{ city.name }}</p>
      <p><strong>クエリ:</strong> {{ city.q }}</p>
      <div><button v-on:click="onGetWeather()">↑この都市のお天気を表示させます</button></div>
      <div v-if="viewFlg">
        <div><button v-on:click="onCloseView()">閉じる</button></div>
        <h2>あなたが取得した時間：{{ nowTime }}</h2>この日時を取得するメソッドを、どこでも流用できる「composables」に置いています。↑
      </div>
    </div>
    <div v-else>
      <p>都市が選択されていません。</p>
    </div>
  </section>



<TheSelectedCityWeather
  v-if="viewFlg && city"
  v-bind:id="city.id"
  v-bind:name="city.name"
  v-bind:q="city.q"
/>

</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

p {
  font-size: 18px;
  margin: 8px 0;
}
</style>

