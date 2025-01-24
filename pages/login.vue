<script setup lang="ts">
import type { User, ReturnJSONAuth } from "@/interfaces"
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
  const asyncData = await useFetch<ReturnJSONAuth>(
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
<!--
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
-->
<template>
  <div class="login-container">
    <h1>ログイン</h1>
    <div class="status">
      <p v-if="pending" class="loading">ログイン中・・・</p>
      <template v-else>

        <p v-if="authFailed" class="err-msg">ログインIDまたはパスワードが違います</p>
        <p v-if="noServerError" class="info-msg">IDとパスワードを入力してログインしてください</p>
        <p v-else class="err-msg">サーバ処理中に障害が発生しました。もう一度ログインを行なってください</p>
      
      </template>
    </div>
    <form @submit.prevent="onLoginButtonClick" class="login-form">
      <div class="form-group">
        <label for="loginId">ID</label>
        <input id="loginId" type="text" v-model="loginId" required>
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input id="password" type="password" v-model="password" required>
      </div>
      <button type="submit" class="login-button">ログイン</button>
    </form>
  </div>
</template>


<style scoped>
/* 全体のスタイリング */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

/* ヘッダー */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* 状態メッセージ */
.status {
  margin-bottom: 20px;
}

.loading {
  color: #007bff;
  font-weight: bold;
}

.info-msg {
  color: #555;
}

.err-msg {
  color: #d9534f;
  font-weight: bold;
}

/* フォーム */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

/* ボタン */
.login-button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
