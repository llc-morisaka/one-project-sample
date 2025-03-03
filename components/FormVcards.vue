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






// 初期テキスト（"bbb" のみ色付き）
const initialText = "aaa bbb ccc";
const text = ref(initialText);
const displayText = ref(""); // ボタン1で表示するための変数
const editableDiv = ref<HTMLDivElement | null>(null);



// 初期状態だけ "bbb" に色をつける関数
const highlightText = (input: string): string => {
  if (input === initialText) {
    return input.replace(/(bbb)/g, '<span class="highlight">$1</span>');
  }
  return input;
};


// ボタン1: 現在のテキストを表示
const showText = (): void => {

  if (!editableDiv.value) {
    console.error("editableDiv が null です");
    return;
  }

  // まず textContent でプレーンテキストのみ取得（タグ除去）
  let extractedText = editableDiv.value.textContent || "";

  // innerHTML から <br> を改行に変換（タグが消えた後でも残る場合に備え）
  extractedText = extractedText.replace(/<br\s*\/?>/g, "\n");

  text.value = extractedText;
  console.log("取得したテキスト:", text.value);
  displayText.value = text.value;
};


// ボタン2: 初期状態にリセット
const resetText = () => {
  text.value = initialText;  // text の値を初期化
  displayText.value = initialText;  // 表示エリアも初期化
  if (editableDiv.value) {
    editableDiv.value.innerHTML = highlightText(initialText);  // 編集エリアも初期化
  }
};


// 初期状態を設定
onMounted(() => {
  if (editableDiv.value) {
    editableDiv.value.innerHTML = highlightText(initialText);
  }
});


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


  <div>入力エリア</div>
    <div class="editable-container">
    <!-- 編集可能なエリア -->
      <div
        class="editable"
        contenteditable="true"
        v-html="highlightText(text)"
        ref="editableDiv"
      ></div>
  </div>

      <!-- 表示エリア -->
  <div>表示エリア</div>
  <div class="display-area">{{ displayText }}</div>
    <!-- ボタン -->
    <div class="button-group">
    <button class="btn" @click="showText">現在のテキストを表示</button>
    <button class="btn" @click="resetText">初期状態に戻す</button>
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

.editable-container {
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
  min-height: 50px;
  font-size: 16px;
}

.editable {
  outline: none;
  white-space: pre-wrap;
}


.editable :deep(.highlight) {
  color: red;
}
.display-area {
  white-space: pre-wrap;  /* 改行を反映 */
  border: 1px solid #ccc;  /* 薄いグレーの枠線 */
  padding: 10px;  /* 内側の余白 */
  background-color: #f9f9f9;  /* 背景色を薄くして視認性向上 */
  border-radius: 4px;  /* 角を丸く */
  min-height: 50px;  /* 最小高さ */
  font-size: 1rem;  /* フォントサイズ調整 */
  margin-top: 10px;  /* 上に少し間隔を追加 */
}


</style>