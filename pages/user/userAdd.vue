<script setup lang="ts">
import type { User } from "@/interfaces";
import axios from "axios";

definePageMeta({
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "利用者登録";
useHead({
  title: PAGE_TITLE
});

const router = useRouter();

// 入力データと同期させるUserオブジェクト
const user: User = reactive({
  id: 0,
  name: "",
  loginId: "",
  password: "",
  authLevel: 1
});

const pending = ref(false);
const noServerError = ref(true);
let errMsg = ref("サーバ処理中に異常が発生しました。もう一度登録を行なってください");


const onAdd = async (): Promise<void> => {
	pending.value = true;
  try {
    const response = await axios.post("/user-management/users", user);
    if (response.data?.result === 1) {
      router.push({ name: "index" });
	  } else	if (response.data?.result === 99) {
      pending.value = false;
      noServerError.value = false;
			errMsg.value = "そのログインIDはすでに存在します";
		} else {
      pending.value = false;
      noServerError.value = false;
    }
  } catch (error) {
    pending.value = false;
    noServerError.value = false;
    console.error("Error occurred while adding user:", error);
  }
};

const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: '利用者一覧', link: 'user-userList' },
  { text: PAGE_TITLE },
];
</script>

<template>
  <div class="container">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <section class="card">
      <h2>{{ PAGE_TITLE }}</h2>
      <p v-if="pending" class="loading">データ送信中...</p>
      <template v-else>
        <p v-if="noServerError" class="instruction">情報を入力し、登録ボタンをクリックしてください。</p>
        <p v-else class="error">{{ errMsg }}</p>
        <form @submit.prevent="onAdd">
          <div class="form-group">
            <label for="addloginId">ログインID</label>
            <input type="text" id="addloginId" v-model="user.loginId" required>
          </div>
          <div class="form-group">
            <label for="addPassword">パスワード</label>
            <input type="password" id="addPassword" v-model="user.password" required>
          </div>
          <!--
					<div class="form-group">
            <label for="addId">ID</label>
            <input type="number" id="addId" v-model.number="user.id" required>
          </div>
				-->          
					<div class="form-group">
            <label for="addName">名前</label>
            <input type="text" id="addName" v-model="user.name" required>
          </div>
          <div class="form-group">
            <label for="addAuthLevel">権限レベル</label>
            <input type="number" id="addAuthLevel" v-model="user.authLevel" required>
          </div>
          <button type="submit" class="btn">登録</button>
        </form>
      </template>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 15px;
}

.loading {
  color: #007bff;
  font-weight: bold;
}

.instruction {
  color: #333;
}

.error {
  color: red;
  font-weight: bold;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #0056b3;
}
</style>
