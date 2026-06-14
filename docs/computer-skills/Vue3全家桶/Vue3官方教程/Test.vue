<script setup lang="ts">
const rawHtml = `<span style="color: red">This should be red.</span>`
</script>

<template>
  <div>
    <h1>H1</h1>
    <div v-html="rawHtml"></div>
  </div>
</template>