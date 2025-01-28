<script setup lang="ts">
import type { User } from "@/interfaces";
import axios from "axios";

definePageMeta({
	// layout: "member",
	middleware: ["loggedin-check"]
});

//ルータオブジェクトを取得。
const router = useRouter();


//入力データと同期させるUserオブジェクトの用意。
const user: User = reactive(
	{
		id: 0,
		name: "",
		loginId: "",
		password: "",
		authLebel: 1
	}
);



//フォームがサブミットされた時の処理。
const pending = ref(false);
const noServerError = ref(true);

const onAdd = async (): Promise<void> => {
  pending.value = true;

  try {
    const response = await axios.post("/user-management/users", user);

    // サーバーからのレスポンスをチェック
    if (response.data?.result === 1) {
      router.push({ name: "/" }); // 成功時の画面遷移
    } else {
      pending.value = false;
      noServerError.value = false; // サーバーエラーの場合
    }
  } catch (error) {
    // ネットワークエラーや例外が発生した場合
    pending.value = false;
    noServerError.value = false;
    console.error("Error occurred while adding user:", error);
  }
};



</script>

<template>
  <!--
	<nav id="breadcrumbs">
		<ul>
			<li><NuxtLink v-bind:to="{name: 'index'}">TOP</NuxtLink></li>
			<li><NuxtLink v-bind:to="{name: 'member-memberList'}">会員リスト</NuxtLink></li>
			<li>会員情報追加</li>
		</ul>
	</nav>
-->
	<section>
		<h2>会員情報追加</h2>
		<p v-if="pending">データ送信中・・・</p>
		<template v-else>
			<p v-if="noServerError">
			情報を入力し、登録ボタンをクリックしてください。
			</p>
			<p v-else>サーバ処理中に異常が発生しました。もう一度登録を行なってください</p>
			<form v-on:submit.prevent="onAdd">
				<dl>
					<dt>
						<label for="addId">ID&nbsp;</label>
					</dt>
					<dd>
						<input type="number" id="addId" v-model.number="user.id" required>
					</dd>
					<dt>
						<label for="addName">名前&nbsp;</label>
					</dt>
					<dd>
						<input type="text" id="addName" v-model="user.name" required>
					</dd>
					<dt>
						<label for="addloginId">ログインID&nbsp;</label>
					</dt>
					<dd>
						<input type="number" id="addloginId" v-model="user.loginId" required>
					</dd>
					<dt>
						<label for="addPassword">パスワード&nbsp;</label>
					</dt>
					<dd>
						<input type="text" id="addPassword" v-model="user.password" required>
					</dd>
				</dl>
				<button type="submit">登録</button>
			</form>
		</template>
	</section>
</template>
