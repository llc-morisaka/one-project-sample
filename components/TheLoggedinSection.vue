<script setup lang="ts">
import { useUserStore } from '@/store/user';

// Piniaストアからユーザー情報を取得
const userStore = useUserStore();
const loginUser = userStore.user;

if (loginUser) {
  console.log("loginUser", loginUser);
} else {
  console.log("Piniaで取得できず");
}
</script>

<template>
  <section class="user-info" v-if="loginUser">
    <p class="username">{{ loginUser.name }} さんがログイン中</p>
    <NuxtLink class="logout-link" v-bind:to="{ name: 'logout' }">ログアウト</NuxtLink>
  </section>
  <p class="error-message" v-else>ログイン情報を取得できませんでした。</p>
</template>

<style scoped>
/* ユーザー情報表示部分 */
.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
}

.username {
  margin: 0;
  font-weight: bold;
}

.logout-link {
  color: #fff;
  text-decoration: underline;
  font-size: 14px;
}

.error-message {
  color: #f44336;
  font-size: 14px;
}
</style>
