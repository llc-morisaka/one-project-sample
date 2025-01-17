<script setup lang="ts">
import { cities } from '@/data/city';
import { useSelectedCityStore } from "@/store/SelectedCity";


definePageMeta({
	layout: "weather",
  middleware: ["loggedin-check"]
});

const selectedCity = ref(null); 
const cityStore = useSelectedCityStore(); // Pinia ストア

onMounted(() => {
  cityStore.clearSelectedCity(); // ステートを空にする
});

const onSelectedCity = async (): Promise<void> => {
  if (selectedCity.value) {
    cityStore.setSelectedCity(selectedCity.value); // Pinia に都市情報を保存
    await navigateTo("/weather/weatherInfo");
  } else {
    console.log('都市が選択されていません');
  }
};


</script>

<template>
	<nav id="breadcrumbs">
		<ul>
			<li><NuxtLink v-bind:to="{name: 'index'}">TOP</NuxtLink></li>
			<li>都市選択</li>
		</ul>
	</nav>
	<section>
    <label for="city-select">都市を選択してください:</label>
    <select id="city-select" v-model="selectedCity" @change="onSelectedCity">
      <option v-for="city in cities" :key="city.id" :value="city">
        {{ city.name }}
      </option>
    </select>
  </section>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 8px;
}

select {
  padding: 8px;
  font-size: 16px;
}
</style>
