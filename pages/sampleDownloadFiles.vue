<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

/* パンクズとかサイドメニューなどお決まりの部分 ***************/
definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});
const PAGE_TITLE = "フォルダごとアップロードしたい";
useHead({
  title: PAGE_TITLE
});
const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];
/*******************************************************/



interface FileItem {
  name: string;
  path?: string;
  isDirectory: boolean;
  files?: FileItem[]; // フォルダの場合のみ
}

const items = ref<FileItem[]>([]);

const fetchFiles = async () => {
  try {
    const response = await axios.get<{ items?: FileItem[] }>('/api/list-files');
    console.log('APIレスポンス:', response.data);

    if (!response.data.items || !Array.isArray(response.data.items)) {
      console.error('APIレスポンスの形式が不正です:', response.data);
      return;
    }

    // フォルダとファイルのデータを分けてセット
    items.value = response.data.items.map(item => ({
      ...item,
      files: item.isDirectory && Array.isArray(item.files) ? item.files : []
    }));

    console.log('変換後の items:', items.value);
  } catch (error) {
    console.error('ファイル一覧の取得に失敗しました:', error);
  }
};

onMounted(fetchFiles);
</script>

<template>
  <div class="page-container">

    <!-- パンくずコンポーネント -->
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <h1 class="page-title">{{ PAGE_TITLE }}</h1>


<!-- 本題 -->   
<div class="file-list-container">
      <h2 class="file-list-title">アップロード済みファイル一覧</h2>
      <ul v-if="items.length > 0" class="file-list">
        <li v-for="item in items" :key="item.name" class="file-item">
          <template v-if="item.isDirectory">
            <div class="folder">
              <span class="icon">📁</span>
              <span class="folder-name">{{ item.name }}</span>
              <a :href="`/api/download-folder?folder=${encodeURIComponent(item.name)}`" class="download-btn">
                フォルダをダウンロード
              </a>
            </div>
            <ul class="sub-file-list">
              <li v-for="file in item.files" :key="file.name" class="sub-file-item">
                <span class="icon">📄</span> {{ file.name }}
                <a :href="`/api/download-file?filename=${encodeURIComponent(file.path ?? '')}`" class="download-btn">
                  ダウンロード
                </a>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="file">
              <span class="icon">📄</span> {{ item.name }}
              <a :href="`/api/download-file?filename=${encodeURIComponent(item.path ?? '')}`" class="download-btn">
                ダウンロード
              </a>
            </div>
          </template>
        </li>
      </ul>
      <p v-else class="no-files">ファイルがありません。</p>
    </div>
  </div>
</template>
<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #eef2f5;
  min-height: 100vh;
}
.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}
.file-list-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.file-list-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #444;
}
.file-list {
  list-style: none;
  padding: 0;
}
.file-item {
  margin-bottom: 10px;
}
.folder, .file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
}
.icon {
  font-size: 1.2rem;
}
.folder-name {
  font-weight: bold;
}
.download-btn {
  margin-left: auto;
  padding: 5px 10px;
  font-size: 0.9rem;
  color: white;
  background: #007bff;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.3s;
}
.download-btn:hover {
  background: #0056b3;
}
.sub-file-list {
  margin-left: 25px;
  list-style: none;
  padding: 5px 0;
}
.sub-file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
}
.no-files {
  text-align: center;
  color: #777;
}
</style>

