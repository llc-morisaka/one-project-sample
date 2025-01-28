<script setup lang="ts">
definePageMeta({
  middleware: ["loggedin-check"]
});
</script>
<template>

	<div v-if="false">
		<h1>TOP</h1>
		<nav id="breadcrumbs">
			<ul>
				<li>これはTOPページです</li>
			</ul>
		</nav>
		<section class="link-section">
			<p>
				<!-- <NuxtLink to="/member/memberList"> -->
				<NuxtLink v-bind:to="{ name: 'weather-weatherShow' }">
					お天気情報取得ページに遷移します
				</NuxtLink>
			</p>
			<p>
				<NuxtLink v-bind:to="{ name: 'myJsonOpenMock' }">
					とあるページに遷移します
				</NuxtLink>
			</p>
  	</section>
	</div>

	<div>
		<div class="top-container">
			<h1>TOP</h1>
			<nav id="breadcrumbs" class="breadcrumbs">
				<ul>
					<li>これはTOPページです</li>
				</ul>
			</nav>
			<section class="navigation-links">
				<p>
					<NuxtLink :to="{ name: 'user-userList' }" class="link-button">
						管理ページ
					</NuxtLink>
				</p>
				<p>
					<NuxtLink :to="{ name: 'weather-weatherShow' }" class="link-button">
						お天気情報取得ページ
					</NuxtLink>
				</p>
				<p>
					<NuxtLink :to="{ name: 'myJsonOpenMock' }" class="link-button">
						MY JSON SERVERから情報取得ページ
					</NuxtLink>
				</p>
			</section>
		</div>
	</div>
</template>

<style scoped>
/* 全体のスタイリング */
.top-container {
  max-width: 600px;
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

/* パンくずリスト */
.breadcrumbs {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  text-align: left;
}

.breadcrumbs ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.breadcrumbs li {
  display: inline-block;
  padding: 5px 0;
}

/* ナビゲーションリンク */
.navigation-links {
  margin-top: 20px;
}

.link-button {
	width: 50%;
  display: inline-block;
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.link-button:hover {
  background-color: #0056b3;
}




/* モバイル対応 */
@media (max-width: 600px) {
  .top-container {
    padding: 15px;
  }

  .link-button {
    font-size: 13px;
    padding: 8px 12px;
  }
}
</style>



