<script setup lang="ts">
// import type { PropType } from 'vue';
import type { Breadcrumb } from '@/interfaces';
/*
const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<Breadcrumb[]>, // パンくずリストの配列
    required: true,
  },
});
*/
const props = defineProps<{
  breadcrumbs: Breadcrumb[];
}>();


</script>

<template>
  <nav id="breadcrumbs">
    <ul>
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <!-- リンクがある場合とない場合で分岐 -->
        <template v-if="breadcrumb.link">
<!--          <NuxtLink :to="breadcrumb.link">{{ breadcrumb.text }}</NuxtLink> -->
          <NuxtLink v-bind:to="{name: breadcrumb.link}">{{ breadcrumb.text }}</NuxtLink>

        </template>
        <template v-else>
          {{ breadcrumb.text }}
        </template>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
#breadcrumbs ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

#breadcrumbs li {
  margin-right: 8px;
}

#breadcrumbs span {
  margin: 0 8px;
  color: #aaa;
}
</style>
