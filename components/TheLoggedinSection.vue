<script setup lang="ts">
import type {User} from "@/interfaces";
import { useUserStore } from '@/store/user';

// const loginUser = useCookie<User | null>("loginUser");


// Piniaストアからユーザー情報を取得
const userStore = useUserStore();
const loginUser = userStore.user;



if(loginUser) {
  console.log("loginUser",loginUser)
}else {
  console.log("pinia取得できず");
}

</script>

<template>
  <section v-if="loginUser">
    <p>{{ loginUser.name }}さんがログイン中</p>
    <p><NuxtLink v-bind:to="{name: 'logout'}">ログアウト</NuxtLink></p>
  </section>
  <p v-else>うまくとれてない</p>
</template>
