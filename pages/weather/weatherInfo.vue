<script setup lang="ts">
import { cities } from '@/data/city';
import { useSelectedCityStore } from "@/store/SelectedCity";


definePageMeta({
	layout: "weather",
  middleware: ["loggedin-check"]
});


const cityStore = useSelectedCityStore();
const city = cityStore.city; // Pinia から都市情報を取得

const onGetWeather = (): Promise<any> =>{
  alert("まだ未実装");
}

</script>

<template>
	<nav id="breadcrumbs">
		<ul>
			<li><NuxtLink v-bind:to="{name: 'index'}">TOP</NuxtLink></li>
			<li><NuxtLink v-bind:to="{name: 'weather-weatherShow'}">都市選択</NuxtLink></li>
			<li>お天気情報</li>
		</ul>
	</nav>

  <section>
    <h1>選択された都市のお天気</h1>
    <div v-if="city">
      <p><strong>ID:</strong> {{ city.id }}</p>
      <p><strong>名前:</strong> {{ city.name }}</p>
      <p><strong>クエリ:</strong> {{ city.q }}</p>
      <button v-on:click="onGetWeather()">この都市のお天気を表示させます</button>
    </div>
    <div v-else>
      <p>都市が選択されていません。</p>
    </div>
  </section>
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

