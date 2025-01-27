<template>
  <div class="layout">
    <header class="header">
      <h1 class="site-title">とあるサンプル</h1>
      <TheLoggedinSection />
    </header>
    <main class="main-content">
      <slot></slot>
    </main>
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

/* メインコンテンツ部分 */
.main-content {
  flex: 1;
  padding: 24px;
  background-color: #f9f9f9;
}
</style>
