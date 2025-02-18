<script setup lang="ts">

definePageMeta({
	layout: "two-block",
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "サンプルPDF表示";
useHead({
  title: PAGE_TITLE
});


const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: PAGE_TITLE },
];

const textInputs = ref(["", "", "", ""]);
const handleButtonClick = (index: number) => {
  console.log(`ボタン ${index} が押されました:`, textInputs.value[index - 1]);
};

// PDFのURL
const pdfSources = ref(["/documents/sample_document.pdf", "/documents/sample_document2.pdf"]);


// iframe の高さ（初期600px, 最大1200px）
const iframeHeights = ref([600, 600]);

// リサイズ処理
const startResize = (event: MouseEvent, index: number) => {
  event.preventDefault();
  const startY = event.clientY;
  const startHeight = iframeHeights.value[index];

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaY = moveEvent.clientY - startY;
    const newHeight = Math.min(1200, Math.max(600, startHeight + deltaY));
    iframeHeights.value[index] = newHeight;
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};




</script>

<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
 
    <section class="pdf-container">
      <!-- 上側（入力フォーム） -->
      <div class="input-area">
        <div class="input-group" v-for="index in 4" :key="index">
          <textarea v-model="textInputs[index - 1]" placeholder="入力してください"></textarea>
          <button @click="handleButtonClick(index)">送信</button>
        </div>
      </div>

      <!-- 下側（PDF表示） -->
      <div class="pdf-area">
        <div class="div-iframe" v-for="(src, idx) in pdfSources" :key="idx">
          <h2>{{ idx === 0 ? 'TEMPLATE' : 'OUTPUT' }}</h2>
          <div class="iframe-wrapper">
            <iframe 
              :src="src" 
              :style="{ height: iframeHeights[idx] + 'px' }"
              frameborder="1"
            ></iframe>
            <div class="resize-handle" @mousedown="startResize($event, idx)"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="btn-area">
      <button>保存</button>
      <button>再生成</button>
      <button>次へ</button>
    </section>
  </div>
</template>

<style scoped>
.pdf-container {
  position: relative;
  display: flex;
  flex-direction: column; /* 子要素を縦にする */
  gap: 16px;
  margin-top: 35px;
  column-gap: 35px;
}


/* 上側の入力エリア */
.input-area {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2列のグリッド */
  gap: 12px;
  column-gap: 35px; /* ← 横の間隔を追加 */

}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 100%;
  align-items: flex-end;
}

textarea {
  width: 100%;
  height: 80px;
  padding: 8px;
  font-size: 14px;
}

button {
  width: 80px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  
}

button:hover {
  background-color: #0056b3;
}

/* 下側のPDFエリア */
.pdf-area {
  flex: 2;
  display: flex;
  gap: 12px;
  max-width: 99%;
}

.div-iframe {
  width: 100%;
}



.iframe-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

iframe {
  width: 100%;
  height: 600px; /* 初期値 */
}

/* リサイズ用ハンドル */
.resize-handle {
  width: 100%;
  height: 10px;
  background: #ccc;
  cursor: ns-resize; /* 上下にドラッグ可能なカーソル */
  position: relative;
  margin-top: -5px; /* ハンドルが境界に重なるよう調整 */
  z-index: 10;
}


.btn-area{
  display: flex;
  gap: 16px;
  margin-top: 35px;
  column-gap: 35px;
  justify-content: flex-end;
  width: 99%;
}
</style>
