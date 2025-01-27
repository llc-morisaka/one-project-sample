<script setup lang="ts">
import type { MenuItem } from "@/interfaces"

// メニューデータを受け取る
defineProps<{
  menuItems: MenuItem[]; // メニュー項目は MenuItem 型の配列
}>();

</script>

<template>
  <ul class="menu">
    <li v-for="(item, index) in menuItems" :key="index">
      <template v-if="item.to">
        <!-- リンクがある場合 -->
        <NuxtLink :to="item.to" class="menu-link">{{ item.name }}</NuxtLink>
      </template>
      <template v-else>
        <!-- サブメニューがある場合 -->
        <span class="menu-title">{{ item.name }}</span>
        <RecursiveMenu v-if="item.children" :menuItems="item.children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu > li {
  margin: 8px 0;
}

.menu-link {
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
}

.menu-link:hover {
  text-decoration: underline;
}

.menu-title {
  font-weight: bold;
  font-size: 16px;
  cursor: default;
}
</style>
