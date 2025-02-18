<script setup lang="ts">
definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "サンプルタブ表示";
useHead({
  title: PAGE_TITLE
});


const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];



// タブのリスト
const tabs: Array<{ name: keyof typeof tabComponents; label: string }> = [
  { name: "Tab1", label: "タブ1" },
  { name: "Tab2", label: "タブ2" },
  { name: "Tab3", label: "タブ3" }
];

// タブごとのコンポーネント
const tabComponents = {
  Tab1: defineAsyncComponent(() => import('@/components/Tab1Content.vue')),
  Tab2: defineAsyncComponent(() => import('@/components/Tab2Content.vue')),
  Tab3: defineAsyncComponent(() => import('@/components/Tab3Content.vue'))
} as const;



// タブの状態を管理
const activeTab = ref<keyof typeof tabComponents>("Tab1");

</script>

<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
  </div>
  <section>
      <!-- タブボタン -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          :class="{ active: activeTab === tab.name }"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 選択されたタブのコンポーネントを表示 -->
      <component :is="tabComponents[activeTab]" />
    </section>
    
    </template>

<style scoped>
/* タブコンテナ */
.tab-container {
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0;
  background: white;
  max-width: 600px;
  margin: auto;
}

/* タブボタンを左寄せ */
.tabs {
  display: flex;
  gap: 5px; /* タブ間の余白 */
  border-bottom: 2px solid #ccc;
  padding: 0 10px; /* 左寄せ */
}

/* タブボタンのデザイン */
.tabs button {
  padding: 10px 20px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid transparent; /* デフォルトは透明 */
  transition: all 0.3s;
  color: black;
  border-radius: 10px 10px 0 0; /* 上部左右の角を丸く */
  position: relative;
  bottom: 0; /* 初期位置 */
}

/* 選択されているタブ */
.tabs button.active {
  background: #007bff; /* 青色 */
  color: white;
  border-bottom: 2px solid white; /* 枠線とピッタリくっつける */
  font-weight: bold;
  bottom: -2px; /* タブを下げて枠線と合体 */
  z-index: 1; /* 枠線の上に配置 */
}

/* タブコンテンツ */
.tab-content {
  padding: 20px;
  background: white;
}
</style>
