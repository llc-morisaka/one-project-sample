<script setup lang="ts">
import axios from "axios";
import type { ReturnJSONVcard } from "@/interfaces"

interface vcard {
  cardTitle?: string;
  cardText?: string;
  sectionId: string;
  initialText: string;
}


const props = defineProps<vcard>();

const cardTitle = props.cardTitle;
const cardText = props.cardText;
const sectionId = props.sectionId;
const textAreaVal = ref(props.initialText);

const tmpFile = `${sectionId}_document`;

const responseData = ref<ReturnJSONVcard>({
  result: 0,
  prompt: '',
  sectionId: '',
  generatedFileName: ''
});

// リセット
const resetFnc = (): void => {
  textAreaVal.value = props.initialText;
  // alert("リセットしました");
}


// 再生成ボタン
const reCreate = async (): Promise<void> => {
  // alert("再生成します----" + sectionId);
  try {
    const response = await axios.post('/samples/vcard', {
      textAreaVal: textAreaVal.value,
      sectionId: sectionId,
      generatedFileName: tmpFile
    },
    {
      headers: {
        "Accept": "application/json"
      },
    });

    console.log('返ってきた値群:', response.data)
    responseData.value = response.data;

  } catch (error: any) {
    if (error.response) {
    // サーバーがステータスコードでエラーを返した場合
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
    // リクエストが送信されたが、レスポンスがない場合
      console.error('No response received:', error.request);
    } else {
    // リクエストの設定中にエラーが発生した場合
    console.error('Error setting up request:', error.message);
    }
  } finally {
  //　成否に関わらず必ずやる処理があればココ

  }

};

</script>



<template>
<section class="form-vcard">
  <h2 v-if="cardTitle" class="v-card-title">{{ cardTitle }}</h2>

  <div class="v-card-text">

    <div v-if="cardText">{{ cardText }}</div>

    <textarea class="v-textarea mb-4" v-model="textAreaVal"></textarea>
    <div>【ここに表示される文字列は、あくまでもPOST後にバックエンドから返却されたデータを表示するようになってます】</div>
    <div>リザルト : {{ responseData.result }}</div>
    <div>入力したテキスト : {{ responseData.prompt }}</div>
    <div>セクションID : {{ responseData.sectionId }}</div>
    <div>生成ファイル名 : {{ responseData.generatedFileName }}</div>
  </div>

  <!-- ボタン -->
  <div class="button-group">
    <button class="btn btn-recreate" @click="reCreate()">再生成</button>
    <button class="btn btn-reset" @click="resetFnc()">リセット</button>
  </div>
</section>
</template>

<style scoped>
.form-vcard {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px; /* このパディングが内側の左右余白になります */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

/* タイトル */
.v-card-title {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
}

/* テキスト部分 */
.v-card-text {
  margin-bottom: 15px;
}

.card-text {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
}

/* テキストエリア：コンテナ内で幅100% */
.v-textarea {
  width: 100%;
  min-height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 1rem;
  box-sizing: border-box;
}

/* ボタンコンテナ：コンテナのパディングに合わせ、右寄せ */
.button-group {
  text-align: right;
}

/* ボタン */
.btn {
  padding: 8px 12px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background 0.3s ease;
  margin-left: 10px; /* ボタン間のスペース */
}

.btn-recreate {
  background: #4CAF50;
  color: #fff;
}

.btn-recreate:hover {
  background: #45a049;
}

.btn-reset {
  background: #f44336;
  color: #fff;
}

.btn-reset:hover {
  background: #e53935;
}
</style>
