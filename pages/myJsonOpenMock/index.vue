<script setup lang="ts">
import axios from "axios";
import type { AxiosProgressEvent } from "axios"; 

definePageMeta({
  layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "MJSから情報取得";
useHead({
  title: PAGE_TITLE
});

const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];



const data = ref<any>(null);

const pending = ref(false);
const noServerError = ref(true);
const authFailed = ref(false);

// エラーメッセージを格納する変数
const isLoading = ref(false); // 読み込み中フラグ（すべての処理で共通）
const isModalOpen = ref(false); // モーダルの開閉状態（onButtonClick3専用）
const errorMessage = ref<string | null>(null);
const id = ref("12345"); // 初期値


const progress = ref(0); // 進捗率 (0% ~ 100%)

const onButtonClick = async (): Promise<void> => {

  try {
    pending.value = true; // ローディング開始
    errorMessage.value = null; // エラーメッセージのリセット
    progress.value = 0; // 初期化

    const config = {
      headers: {
        'Authorization': 'token-token-token-token', // テキトーな認証トークン
        'Content-Type': 'application/json',       // コンテンツタイプ
      },
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      }
    };
    const response = await axios.get(`https://my-json-server.typicode.com/llc-morisaka/my-json/member/${id.value}`, config);

    data.value = response.data; // 取得データを保存

  } catch (error: any) {
    errorMessage.value = error.message || 'データ取得中にエラーが発生しました';
  } finally {
    pending.value = false; // ローディング終了
  }
};  




const onButtonClick2 = async (): Promise<void> => {
  try {
    isLoading.value = true;
    errorMessage.value = null;
    progress.value = 0;
    data.value = null;

    const response = await axios.get("/samples/slows", {
      responseType: "text", 
      onDownloadProgress: (event) => {
        const receivedText = event.event?.target?.responseText;
        if (!receivedText) return;

        const parts = receivedText.split("\n").filter(Boolean);
        parts.forEach((part: any) => {
          try {
            const dataChunk = JSON.parse(part);
            if (dataChunk.progress !== undefined) {
              progress.value = dataChunk.progress;
            }
            if (dataChunk.message) {
              data.value = dataChunk;
            }
          } catch (error) {
            console.warn("JSON パースエラー:", error);
          }
        });
      },
    });

    console.log("最終レスポンス:", response.data);
  } catch (error: any) {
    errorMessage.value = error.message || "データ取得中にエラーが発生しました";
  } finally {
    isLoading.value = false;
  }
};

const onButtonClick3 = async (): Promise<void> => {
  try {
    isLoading.value = true;
    isModalOpen.value = true; // モーダルを開く
    errorMessage.value = null;
    progress.value = 0;
    data.value = null;

    const response = await axios.get("/samples/slows", {
      responseType: "text", 
      onDownloadProgress: (event) => {
        const receivedText = event.event?.target?.responseText;
        if (!receivedText) return;

        const parts = receivedText.split("\n").filter(Boolean);
        parts.forEach((part: any) => {
          try {
            const dataChunk = JSON.parse(part);
            if (dataChunk.progress !== undefined) {
              progress.value = dataChunk.progress;
            }
            if (dataChunk.message) {
              data.value = dataChunk;
            }
          } catch (error) {
            console.warn("JSON パースエラー:", error);
          }
        });
      },
    });

    console.log("最終レスポンス:", response.data);
  } catch (error: any) {
    errorMessage.value = error.message || "データ取得中にエラーが発生しました";
  } finally {
    isLoading.value = false;
    isModalOpen.value = false; // 処理完了後にモーダルを閉じる
  }
};
</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" />

  <div class="api-container">
    <h1>APIデータの取得</h1>
    <p class="description">
      12345~12349 の数値を入力してデータを検索してください。
    </p>

    <div class="input-container">
      <input type="text" v-model="id" name="id" class="id-input" placeholder="IDを入力" />
      <button class="search-button" @click="onButtonClick2()" :disabled="isLoading">
        プログレスバーサンプル
      </button>
      <button class="search-button" @click="onButtonClick3()" :disabled="isLoading">
        モーダルサンプル
      </button>
    </div>

    <div class="result-container">
      <div v-if="isLoading" class="loading-message">データを取得中です...</div>
      
      <!-- 🔹 プログレスバー (onButtonClick2() の時はこのまま表示) -->
      <progress v-if="isLoading && !isModalOpen" :value="progress" max="100"></progress>

      <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-else-if="data" class="data-display">
        <h2>取得したデータ</h2>
        <pre>{{ data }}</pre>
      </div>
    </div>
  </div>

  <!-- 🔹 モーダル (onButtonClick3() の時だけ表示) -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <h2>データ取得中...</h2>
      <progress :value="progress" max="100"></progress>
    </div>
  </div>
</template>

<style scoped>
/* 全体のスタイル */
.api-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  text-align: center;
}

/* タイトル */
.api-container h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 16px;
}

/* 説明文 */
.description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

/* 入力フォームのスタイル */
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.id-input {
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.search-button {
  padding: 10px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
}

/* 結果表示のスタイル */
.result-container {
  margin-top: 20px;
  text-align: left;
}

.loading-message {
  color: #007bff;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}

.data-display {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-word;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.close-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}
</style>
