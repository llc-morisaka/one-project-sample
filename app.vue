<script lang="ts" setup>
import type { User } from "@/interfaces";
import axios from "axios";


const SITE_TITLE = "とあるサンプル";
useHead({
	titleTemplate: (titleChunk: string | undefined): string => {
		let title = SITE_TITLE;
		if (titleChunk != undefined) {
			title = `${titleChunk} | ${SITE_TITLE}`;
		}
		return title;
	}
});


// 初期ユーザ
const user: User = {
		id: 1,
		name: "管理者太郎",
		loginId: "admin",
		password: "admin",
		authLevel: 9
};

const initializeApp = async (): Promise<void> => {
	let pending = true;
	try {
		const response = await axios.post("/user-management/users", user);
		
		// サーバーからのレスポンスをチェック
		if (response.data?.result === 1) {
		  // 失敗
			console.log("管理者登録成功");
		} else {
      // 成功
			console.log("管理者登録失敗");
			pending = false;
		}

	} catch (error) {
		// ネットワークエラーや例外が発生した場合
		pending = false;
		console.error("Error occurred while adding user:", error);
	}
};

onMounted(() => {
  // console.log('アプリ起動時に 1 回だけ実行される処理')
	initializeApp();
});

</script>

<template>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
</template>

<style>
/*
main {
	border: blue 1px solid;
	padding: 10px;
}
*/
#breadcrumbs ul li {
	display: inline;
	list-style-type: none;
}
#breadcrumbs {
	margin-left: 0px;
}
#breadcrumbs ul {
	padding-left: 0px;
}
#breadcrumbs ul .current {
	color: red;
}
#breadcrumbs ul li:before {
	content: " > ";
}
#breadcrumbs ul li:first-child:before {
	content: none;
}
</style>
