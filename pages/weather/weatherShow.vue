<script setup lang="ts">
import { cities } from '@/data/city';
import { useSelectedCityStore } from "@/store/SelectedCity";


definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "都市選択";
useHead({
  title: PAGE_TITLE
});


const selectedCity = ref(null); 
const cityStore = useSelectedCityStore(); // Pinia ストア


const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];


onMounted(() => {
  cityStore.clearSelectedCity(); // ステートを空にする
});

const onSelectedCity = async (): Promise<void> => {
  if (selectedCity.value) {
    cityStore.setSelectedCity(selectedCity.value); // Pinia に都市情報を保存
    // await navigateTo("/weather/weatherInfo");
  } else {
    console.log('都市が選択されていません');
  }
};

const onSelectedCityInfo = async (): Promise<void> => {
  if (cityStore.city) {
    await navigateTo("/weather/weatherInfo");
  } else {
    console.log('都市が選択されていません');
  }
};
</script>

<template>
  <div>

    <Breadcrumbs :breadcrumbs="breadcrumbs" />
 
    <section class="city-selection">
      <h1>都市を選択してください</h1>
      <div class="form-group">
        <label for="city-select">都市:</label>
        <select id="city-select" v-model="selectedCity" @change="onSelectedCity">
          <option value="" disabled selected>都市を選択...</option>
          <option v-for="city in cities" :key="city.id" :value="city">
            {{ city.name }}
          </option>
        </select>
      </div>
      <p v-if="!selectedCity">都市を選択して「続行」をクリックしてください。</p>
      <button
        class="continue-button"
        :disabled="!selectedCity"
        @click="onSelectedCityInfo()"
      >
        続行
      </button>
    </section>
  </div>
</template>

<style scoped>
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

#breadcrumbs li:not(:last-child)::after {
  content: ">";
  margin-left: 8px;
  color: #aaa;
}

/* セクション全体 */
.city-selection {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
}

/* ラベルとセレクトボックス */
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* ボタン */
.continue-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.continue-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.continue-button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
