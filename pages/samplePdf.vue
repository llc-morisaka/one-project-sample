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


</script>

<template>
  <div>

    <Breadcrumbs :breadcrumbs="breadcrumbs" />
 
    <section>
    </section>
  </div>
</template>

