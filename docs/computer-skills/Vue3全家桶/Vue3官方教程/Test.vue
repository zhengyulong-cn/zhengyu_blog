<script setup lang="ts">
import { ref } from 'vue'
const messageList = ref([
  { message: 'Foo', id: 1},
  { message: 'Bar', id: 2},
  { message: 'Batterfly', id: 3},
])

const myObject = ref({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
</script>

<template>
  <!-- 访问对象数组，对象可以结构访问 -->
  <div v-for="({ message, id }, index) in messageList" :key="id">{{ index }} - {{ message }}</div>
  <!-- 迭代器语法访问 -->
  <div v-for="({ message, id }) of messageList" :key="id">{{ message }}</div>
  <!-- 访问对象 -->
  <div v-for="(v, k, i) in myObject" :key="i">{{ i }}- {{ k }} - {{ v }}</div>
  <!-- 使用范围值 -->
  <div v-for="n in 10" :key="n">{{ n }}</div>
</template>