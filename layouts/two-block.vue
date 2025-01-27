<script setup lang="ts">
import { menuData } from '@/data/menuDataA';

</script>
<template>
  <div class="layout">
    <header class="header">
      <h1 class="site-title">とあるサンプル</h1>
      <TheLoggedinSection />
    </header>
    <div class="content">
      <!-- 左側のメニュー -->
      <aside class="sidebar">
        <RecursiveMenu :menuItems="menuData" />        
<!--        
        <nav>
          <ul>
            <li><NuxtLink v-bind:to="{name: 'index'}">トップ</NuxtLink></li>
          </ul>
        </nav>
      -->
      </aside>
      <!-- メインコンテンツ部分 -->
      <main class="main-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* レイアウト全体 */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ヘッダー部分 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #007bff;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.site-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

/* コンテンツ全体 */
.content {
  display: flex;
  flex: 1;
}

/* サイドバー */
.sidebar {
  width: 250px;
  background-color: #f0f0f0;
  padding: 16px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 8px;
}

.sidebar a {
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
}

.sidebar a:hover {
  text-decoration: underline;
}

/* メインコンテンツ部分 */
.main-content {
  flex: 1;
  padding: 24px;
  background-color: #f9f9f9;
}
</style>
