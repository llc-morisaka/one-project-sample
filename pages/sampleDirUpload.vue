<script setup lang="ts">
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

const files = ref<File[]>([]); // File型の配列
const deletedFiles = ref<string[]>([]); // 削除されたファイル名を管理する配列
const filesByFolder = ref<{ [folder: string]: File[] }>({}); // フォルダごとのファイルリスト


const resetInput = (event: any) => {
  event.target.value = ''; // 選択をリセットして、同じフォルダでも @change を発火させる
};

const handleFolderUpload = (event: any) => {
  const newFiles = Array.from(event.target.files) as File[];

  if (newFiles.length > 0) {
    newFiles.forEach(file => {
      const folder = file.webkitRelativePath.split('/')[0]; // フォルダ名取得

      // フォルダが未登録なら作成
      if (!filesByFolder.value[folder]) {
        filesByFolder.value[folder] = [];
      }

      // すでにあるファイルは追加しない
      if (!filesByFolder.value[folder].some(f => f.name === file.name) && !deletedFiles.value.includes(file.name)) {
        filesByFolder.value[folder].push(file);
      }
    });
  }
};


const removeFile = (folder: string, index: number) => {
  const removedFile = filesByFolder.value[folder].splice(index, 1)[0];

  // 削除後にフォルダ内のファイルが空ならフォルダごと削除
  if (filesByFolder.value[folder].length === 0) {
    delete filesByFolder.value[folder];
  }

  deletedFiles.value.push(removedFile.name);
};


const uploadFiles = async () => {
  // filesByFolderにあるすべてのファイルをfiles.valueにまとめる
  files.value = Object.values(filesByFolder.value).flat();

  if (!files.value.length) return alert('フォルダを選択してください');

  const formData = new FormData();
  files.value.forEach((file) => formData.append('files', file));

  try {
    await axios.post('/api/upload-folder', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('アップロード成功！');
  } catch (error) {
    console.error(error);
    alert('アップロード失敗');
  }
};

</script>

<template>
  <div class="page-container">
    <!-- パンくずコンポーネント -->
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <h1 class="page-title">{{ PAGE_TITLE }}</h1>

    <!-- ここから本題 -->
    <div class="upload-container">
      <label for="folder-upload" class="upload-label">
        フォルダを選択
        <input
          type="file"
          id="folder-upload"
          webkitdirectory
          directory
          @change="handleFolderUpload"
          @click="resetInput"
          class="file-input"
        />
      </label>

      <!-- ファイル名リストの表示 -->
      <div v-if="Object.keys(filesByFolder).length > 0" class="file-list-container">
        <h3>選択されたフォルダとファイル</h3>

        <div v-for="(files, folder, index) in filesByFolder" :key="index" class="folder-section">
          <h4>{{ folder }}</h4>
          <ul class="file-list">
            <li v-for="(file, fileIndex) in files" :key="fileIndex">
              {{ file.name }}
              <button @click="removeFile(folder as string, fileIndex)" class="remove-button">削除</button>
            </li>
          </ul>
        </div>
      </div>

      <button @click="uploadFiles" class="upload-button">フォルダUpload実行</button>

      <section class="link-section">
        <p>
          <NuxtLink :to="{ name: 'sampleDownloadFiles' }" class="link-button">
            ファイル一覧へ
          </NuxtLink>
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #eef2f5;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.upload-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.upload-label:hover {
  background-color: #45a049;
}

.file-input {
  display: none;
}

.file-list-container {
  margin-top: 20px;
  text-align: left;
  max-width: 100%;
}

.folder-section {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
}

.folder-section h4 {
  margin: 0;
  padding: 5px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.file-list {
  list-style: none;
  padding: 0;
}

.file-list li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.remove-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.upload-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #0056b3;
}

.link-section {
  margin-top: 20px;
  text-align: center;
}

.link-button {
  color: #007bff;
  font-size: 1rem;
  text-decoration: none;
}

.link-button:hover {
  text-decoration: underline;
}
</style>
