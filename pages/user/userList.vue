<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import type { User } from "@/interfaces";

// ページメタ設定
definePageMeta({
  // layout: "User",
  middleware: ["loggedin-check"],
});

// ステートの定義
const responseData = ref<any>(null);
const pending = ref(false);
const error = ref<Error | null>(null);
const userList = computed((): User[] => {
  let returnList: User[] = [];
  if (responseData.value != null) {
    returnList = responseData.value.data;
  }
  return returnList;
});
const isEmptyList = computed((): boolean => {
  return userList.value.length === 0;
});
const noServerError = computed((): boolean => {
  let resultVal = false;
  if (error.value === null && responseData.value != null && responseData.value.result === 1) {
    resultVal = true;
  }
  return resultVal;
});

// データ取得処理
const fetchUserData = async () => {
  pending.value = true; // データ取得中のフラグを立てる
  try {
    const response = await axios.get("/user-management/users");
    responseData.value = response.data; // サーバーからのデータを格納
    error.value = null; // エラーなし
  } catch (err) {
    error.value = err as Error; // エラーを格納
  } finally {
    pending.value = false; // データ取得完了
  }
};

// 初期化時にデータを取得
onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink :to="{ name: 'index' }">TOP</NuxtLink></li>
      <li>ユーザリスト</li>
    </ul>
  </nav>
  <section>
    <h2>ユーザリスト</h2>
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
