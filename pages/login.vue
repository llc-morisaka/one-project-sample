<script setup lang="ts">
import type { User } from "@/interfaces"
import { useUserStore } from '@/store/user';

definePageMeta({
  layout: "loggedout"
});

const loginId = ref("");
const password = ref("")


const pending = ref(false);
const noServerError = ref(true);
const authFailed = ref(false);
const userStore = useUserStore();  // Piniaストアのインスタンス


const onLoginButtonClick = async (): Promise<void> => {
  pending.value = true;
  authFailed.value = false;
  noServerError.value = true;

  // ログインデータのPOST送信
  const asyncData = await useFetch(
    "user-management/auth",
    {
      method: "POST",
      body: {
        loginId: loginId.value,
        password: password.value
      }
    }
  );

  if(asyncData.error.value == null && asyncData.data.value != null && asyncData.data.value.result == 1) {
  // エンドポイント側の処理は成功
    
    if (asyncData.data.value.token != "" && asyncData.data.value.user != null) {
    // 認証が通った

      // Piniaストアにユーザー情報とトークンを保存
      userStore.setUser(asyncData.data.value.user, asyncData.data.value.token);

      // ユーザ情報をクッキーに格納
      //const loginUserCookie = useCookie<User | null>("loginUser");
      //loginUserCookie.value=asyncData.data.value.user;
      // アクセストークン文字列をクッキーに格納
      //const loginTokenCookie = useCookie<string | null>("loginToken");
      //loginTokenCookie.value = asyncData.data.value.token;

      await navigateTo("/");

    } else {
    // 認証が通らなかった
      pending.value = false;
      authFailed.value = true;
    }

  } else {
  // エンドポイント側の処理が失敗
    pending.value = false;
    noServerError.value = false;
  }

};
</script>

<template>
  <h1>ログイン</h1>
  <p v-if="pending">ログイン中・・・</p>
  <template v-else>
    <p class="errMsg" v-if="authFailed">ログインIDまたはパスワードが違います</p>
    <p v-if="noServerError">IDとパスワードを入力してログインしてください</p>
    <p  class="errMsg" v-else>サーバ処理中に障害が発生しました。もう一度ログインを行なってください</p>
    <form v-on:submit.prevent="onLoginButtonClick">
      <dl>
        <dt>ID</dt>
        <dd><input type="text" v-model="loginId" required></dd>
        <dt>パスワード</dt>
        <dd><input type="password" v-model="password" required></dd>
      </dl>
      <button type="submit">ログイン</button>
    </form>
  </template>
</template>

<style scoped>
.errMsg {
  color: #ff0000;
  font-weight: 900;
}
</style>