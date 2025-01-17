<script setup lang="ts">
definePageMeta({
  middleware: ["loggedin-check"]
});
</script>

<template>
	<h1>TOP</h1>
	<nav id="breadcrumbs">
		<ul>
			<li>これはTOPページです</li>
		</ul>
	</nav>
	<section>
		<p>
			<!-- <NuxtLink to="/member/memberList"> -->
			<NuxtLink v-bind:to="{name: 'weather-weatherShow'}">
				お天気情報取得ページに遷移します
			</NuxtLink>
		</p>
	</section>
</template>
