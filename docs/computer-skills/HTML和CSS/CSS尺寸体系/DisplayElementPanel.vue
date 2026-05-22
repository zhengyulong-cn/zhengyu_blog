<script setup lang="ts">
interface Case {
  title: string
  displayA: string
  displayB: string
  desc: string
}

const cases: Case[] = [
  {
    title: 'block + block',
    displayA: 'block',
    displayB: 'block',
    desc: '垂直堆叠，折叠边距，宽度自动填满。',
  },
  {
    title: 'inline + inline',
    displayA: 'inline',
    displayB: 'inline',
    desc: '水平流式排列，自动换行，不能设宽高。',
  },
  {
    title: 'inline-block + inline-block',
    displayA: 'inline-block',
    displayB: 'inline-block',
    desc: '水平流式，可设宽高，可换行，有间隙问题，垂直边距真实生效。',
  },
  {
    title: 'block + inline',
    displayA: 'block',
    displayB: 'inline',
    desc: 'block 独占一行，inline 紧跟其后但在一行内流动',
  },
  {
    title: 'block + inline-block',
    displayA: 'block',
    displayB: 'inline-block',
    desc: 'block 独占一行，inline-block 在下一行，但可设置宽高',
  },
  {
    title: 'inline + inline-block',
    displayA: 'inline',
    displayB: 'inline-block',
    desc: '两者水平排列，inline 忽略宽高，inline-block 遵守宽高',
  },
]
</script>

<template>
  <div class="display-demo">
    <div v-for="c in cases" :key="c.title" class="case-card">
      <div class="case-header">
        <code class="case-title">{{ c.title }}</code>
        <span class="case-desc">{{ c.desc }}</span>
      </div>
      <div class="case-body">
        <div class="element element-a" :style="{ display: c.displayA }">
          A
        </div>
        <div class="element element-b" :style="{ display: c.displayB }">
          B
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 16px 0;
}

.case-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.case-header {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 8px;
  padding: 10px 14px 6px;
  background: var(--vp-c-bg-soft);
}

.case-title {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.case-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.case-body {
  padding: 12px;
  min-height: 150px;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 19px,
      var(--vp-c-divider) 19px,
      var(--vp-c-divider) 20px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 19px,
      var(--vp-c-divider-light, rgba(128, 128, 128, 0.1)) 19px,
      var(--vp-c-divider-light, rgba(128, 128, 128, 0.1)) 20px
    );
}

.element {
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #fff;
  width: 80px;
  height: 40px;
  margin: 6px;
  padding: 4px 8px;
}

.element-a {
  background: #f97316;
  border: 2px solid #ea580c;
}

.element-b {
  background: #06b6d4;
  border: 2px solid #0891b2;
}

@media (max-width: 640px) {
  .display-demo {
    grid-template-columns: 1fr;
  }
}
</style>
