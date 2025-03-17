<script>
export default {
  data() {
    return {
      PAGE_TITLE: "テキストエリア風エディタブルエリアoptionsAPIバージョンサンプル",
      breadcrumbs: [
        { text: 'TOP', link: 'index' },
        { text: "テキストエリア風エディタブルエリアoptionsAPIバージョンサンプル" }
      ],
      initialText: "aaa [最終来院] ccc ddd eee fff ggg hhh iii jjj kkk",
      emphasisWord: ["[最終来院]", "eee", "kkk"],
      text: "",
      displayText: "",
      editableDiv: null
    };
  },
  head() {
    return {
      title: this.PAGE_TITLE
    };
  },
 /* 
  mounted() {
    this.text = this.initialText;
    if (this.$refs.editableDiv) {
      this.$refs.editableDiv.innerHTML = this.highlightText(this.initialText);
    }
  },
  */
  mounted() {
    this.text = this.initialText;
    
    // 監視しまくり版
    this.$nextTick(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // DOMに表示されたら実行
          if (this.$refs.editableDiv) {
            this.$refs.editableDiv.innerHTML = this.highlightText(this.initialText);
          }
          observer.disconnect(); // 一度実行したらオブザーバーを解除
        }
      });

      if (this.$refs.editableDiv) {
        observer.observe(this.$refs.editableDiv);
      }
    });

  },
  methods: {
    highlightText(input) {
      const escapedWords = this.emphasisWord.map(word => word.replace(/[\[\]]/g, '\\$&'));
      const regex = new RegExp(`(^|\\s)(${escapedWords.join("|")})(?=\\s|$)`, "g");
      return input.replace(regex, '$1<span class="highlight">$2</span>');
    },
    showText() {
      if (!this.$refs.editableDiv) {
        console.error("editableDiv が null です");
        return;
      }
      let extractedText = this.$refs.editableDiv.textContent || "";
      extractedText = extractedText.replace(/<br\s*\/?>/g, "\n");
      this.text = extractedText;
      this.displayText = this.text;
    },
    resetText() {
      this.text = this.initialText;
      this.displayText = "";
      if (this.$refs.editableDiv) {
        this.$refs.editableDiv.innerHTML = this.highlightText(this.initialText);
      }
    }
  }
};
</script>
<script setup>
definePageMeta({
  layout: "two-block",
  middleware: ["loggedin-check"]
});
</script>
<template>
  <div class="page-container">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1 class="page-title">{{ PAGE_TITLE }}</h1>
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
    <section class="view_area">
      <div>表示エリア</div>
      <div class="display-area">{{ displayText }}</div>
      <div class="button-group">
        <button class="btn btn-recreate" @click="showText">現在の入力値を表示</button>
        <button class="btn btn-reset" @click="resetText">初期状態に戻す</button>
      </div>
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

