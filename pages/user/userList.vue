<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import type { User } from "@/interfaces";

// ページメタ設定
definePageMeta({
  // layout: "User",
  middleware: ["loggedin-check"],
});

const PAGE_TITLE = "利用者一覧";
useHead({
  title: PAGE_TITLE
});

const responseData = ref<any>(null);
const pending = ref(false);
const error = ref<Error | null>(null);

const userList = computed((): User[] => {
  let returnList: User[] = [];
  if (responseData.value != null) {
    console.log("あああああああ");
    returnList = responseData.value.data;
  }
  return returnList;
});


const isEmptyList = computed((): boolean => {
  console.log("おおおお");
  
  return userList.value.length === 0;
});


const noServerError = computed((): boolean => {
  let resultVal = false;
  if (error.value === null && responseData.value != null && responseData.value.result === 1) {
    resultVal = true;
  }
  return resultVal;
});

// 利用者情報取得処理
const fetchUserData = async () => {
  pending.value = true; // データ取得中のフラグを立てる
  try {
    //const response = await axios.get("/user-management/users");
    const response = await axios.get("/user-management/users");

console.log("response----", response.data);

    responseData.value = response.data; // サーバーからのデータを格納

    error.value = null; // エラーなし
  } catch (err) {
    error.value = err as Error; // エラーを格納
  } finally {
    pending.value = false; // データ取得完了
  }
};




const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];


// 初期化時にデータを取得
onMounted(() => {
  fetchUserData();
});
</script>

<template>

  <Breadcrumbs :breadcrumbs="breadcrumbs" />
<!--
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink :to="{ name: 'index' }">TOP</NuxtLink></li>
      <li>ユーザリスト</li>
    </ul>
  </nav>
-->
  <section>
    <h2>利用者リスト</h2>
    <p>新規登録は<NuxtLink :to="{ name: 'user-userAdd' }">こちら</NuxtLink>から</p>
    <p v-if="pending">データ取得中…</p>

    <template v-else>
      <section v-if="noServerError">
        <ul>
          <li v-if="isEmptyList">ユーザ情報は存在しません。</li>
          <li
            v-for="user in userList"
            :key="user.id"
          >
            <NuxtLink
              :to="{ name: 'user-userDetail-id', params: { id: user.id } }"
            >
              IDが{{ user.id }}の{{ user.name }}さん

              
            </NuxtLink>
          </li>
        </ul>
      </section>
      <p v-else>サーバからデータ取得中に障害が発生しました</p>
    </template>
  </section>
</template>

<style scoped>
/* 見出しデザイン */
h2 {
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

/* 新規登録ボタン */
p a {
  display: inline-block;
  padding: 8px 15px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

p a:hover {
  background: #0056b3;
}

/* ユーザーリスト */
ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;
}

li:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* ローディング中のデザイン */
p[v-if="pending"] {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
}

/* エラーメッセージ */
p[v-else] {
  color: red;
  font-weight: bold;
}
</style>
