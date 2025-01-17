<template>
  <header>
    <h1>とあるサンプル</h1>
    <TheLoggedinSection/>
  </header>
  <main>
    <h1>お天気取得</h1>

  ここがコンポーネントの表示部↓  
  <div class="sotowaku">
    <slot></slot>
  </div>
  </main>
</template>

<style scoped>
.sotowaku {
  border: solid 1px;
}
</style>