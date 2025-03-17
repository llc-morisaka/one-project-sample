<script setup lang="ts">
/* パンクズとかサイドメニューなどお決まりの部分 ***************/
definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});
const PAGE_TITLE = "テキストエリア風エディタブルエリア";
useHead({
  title: PAGE_TITLE
});
const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];
/*******************************************************/


// 初期値
const initialText = "aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk";

// 初期値の文字列の中で、強調させたい単語を配列にして格納しておく
const emphasisWord = ["bbb", "eee", "kkk"];

const text = ref(initialText);
const displayText = ref("");
const editableDiv = ref<HTMLDivElement | null>(null);

// emphasisWordで指定した文字列に対してのみ、<span>タグをつけたものに変換
const highlightText = (input: string): string => {
  // 配列内の単語を "|" で結合し、動的に正規表現を作成(例えば「bbb」だけひっかかるようにして、「bbbb」などは置換外にするための措置)
  const regex = new RegExp(`\\b(${emphasisWord.join("|")})\\b`, "g");

  console.log("regex---", regex);
  return input.replace(regex, '<span class="highlight">$1</span>');
};


// 現在の入力値を表示ボタン
const showText = (): void => {
  if (!editableDiv.value) {
    console.error("editableDiv が null です");
    return;
  }

  // textContent で実際のテキストのみにする（タグ除去）
  let extractedText = editableDiv.value.textContent || "";

  // innerHTML から <br> を改行に変換（タグが消えた後でも残る場合に備え）まあ不要だと思うけど一応
  extractedText = extractedText.replace(/<br\s*\/?>/g, "\n");

  text.value = extractedText;
  console.log("取得したテキスト:", text.value);
  displayText.value = text.value;
};

// 初期状態に戻すボタン
const resetText = () => {
  text.value = initialText;  // text の値を初期化
  displayText.value = "";  // 表示エリアを空に
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
  <div class="page-container">

    <!-- パンくずコンポーネント -->
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <h1 class="page-title">{{ PAGE_TITLE }}</h1>


<!-- ここから本題 -->   

    <!-- 編集可能なエリア -->
    <section class="view_area">
      <div>入力エリア</div>
      <div class="editable-container">
        <div
          class="editable"
          contenteditable="true"
          v-html="highlightText(text)"
          ref="editableDiv"
        ></div>
      </div>
    </section>

    <!-- 表示エリア -->
    <section class="view_area">
      <div>表示エリア</div>
      <div class="display-area">{{ displayText }}</div>
      <!-- ボタン -->
      <div class="button-group">
        <button class="btn btn-recreate" @click="showText">現在の入力値を表示</button>
        <button class="btn btn-reset" @click="resetText">初期状態に戻す</button>
      </div>
    </section>


    <!-- 注意点-->
    <section>
      <h3>上記は、divタグに「contenteditable="true"」をつけて、入力可能エリアを設置しています。</h3>
      <p>この方法の注意点</p>
      <dl>
        <dt>入力文字の色(途中)</dt>
        <dd>
          例えば赤くなっている「bbb」の文字列の中や、その文字列の直後にカーソルを置き、何か文字を打っていくとその文字も赤くなってしまう。
        </dd>
        <dt>入力文字の色(最後尾)</dt>
        <dd>もしも最後尾の文字列に色の指定が入ってい他場合、それに続けて何か文字を入力するとそれらもその色になってしまう</dd>
      </dl>
    </section>

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
.editable-container {
  border: 1px solid #ccc;
  min-height: 50px;
  font-size: 16px;
}

.editable {
  padding: 10px;
  outline: none;
  white-space: pre-wrap;
  height: 250px;
  width: 98%;
  background-color: #f9f9f9;

}

.editable :deep(.highlight) {
  color: red;
}

.view_area{
  margin-top: 10px;
}

.display-area {
  white-space: pre-wrap;
  border: 1px solid #ccc;
  padding: 010px;
  border-radius: 4px;
  min-height: 50px;
  font-size: 1rem;
  margin-top: 10px;
  height: 250px;
}


/* ボタンコンテナ：コンテナのパディングに合わせ、右寄せ */
.button-group {
  padding: 10px;
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
  margin-left: 10px; 
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
