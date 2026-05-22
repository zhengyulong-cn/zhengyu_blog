<script setup lang="ts">
interface DemoCase {
  name: string
  value: string
  desc: string
  content: string
  showCode: string
  containerWidth?: string
  extraStyle?: Record<string, string>
}

const demoCases: DemoCase[] = [
  {
    name: 'auto',
    value: 'auto',
    desc: '块级元素默认值。填满父容器可用空间（stretch 行为）。',
    content: '我是 auto 宽度，自动填满父容器。',
    showCode: 'width: auto;',
  },
  {
    name: '50%',
    value: '50%',
    desc: '占父容器宽度的 50%。父容器宽度改变时，子元素宽度联动。',
    content: '我是 50% 宽度。',
    showCode: 'width: 50%;',
  },
  {
    name: 'stretch',
    value: 'stretch',
    desc: '充分利用容器可用空间。与 width: 100% 类似，但更智能地处理 margin/padding。',
    content: '我是 stretch，撑满父容器可用空间。',
    showCode: 'width: stretch;',
  },
  {
    name: 'inherit',
    value: 'inherit',
    desc: '继承父元素设置的 width 值。此处父容器显式设置了 width: 220px。',
    content: '我是 inherit，继承父元素宽度。',
    showCode: '/* 父容器 */\nwidth: 220px;\n/* 子元素 */\nwidth: inherit;',
    containerWidth: '220px',
  },
  {
    name: 'max-content',
    value: 'max-content',
    desc: '内容不换行，宽度由最长的一行内容决定。盒子"能多宽就多宽"。',
    content: '我是 max-content，我不会换行，所以我的宽度是内容的自然宽度。这段文本应该非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长',
    showCode: 'width: max-content;',
  },
  {
    name: 'min-content',
    value: 'min-content',
    desc: '宽度等于内部最宽不可断元素（如英文单词）的宽度，中文逐字断行。',
    content: '我是 min-content，我会尽量收缩，收缩到最窄不可再断为止。',
    showCode: 'width: min-content;',
  },
  {
    name: 'fit-content',
    value: 'fit-content',
    desc: '收缩到内容合适宽度，但不超过父容器。等价于 min(max-content, stretch)。',
    content: '我是 fit-content，我根据内容收缩到合适的宽度。',
    showCode: 'width: fit-content;',
  },
]
</script>

<template>
  <div class="dimension-demo">
    <div v-for="c in demoCases" :key="c.name" class="dim-card">
      <div class="dim-header">
        <code class="dim-value">{{ c.name }}</code>
        <code class="dim-css">{{ c.showCode }}</code>
      </div>
      <div class="dim-body" :style="c.containerWidth ? { width: c.containerWidth } : {}">
        <div
          class="dim-box"
          :class="`dim-box--${c.name}`"
          :style="{ width: c.value, ...c.extraStyle }"
        >
          {{ c.content }}
        </div>
      </div>
      <div class="dim-footer">
        <p>{{ c.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dimension-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 16px 0;
}

.dim-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.dim-header {
  padding: 10px 14px 6px;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.dim-value {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.dim-css {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 11px;
  color: var(--vp-c-text-2);
  white-space: pre-line;
  background: var(--vp-code-block-bg);
  padding: 2px 6px;
  border-radius: 4px;
}

.dim-body {
  margin: 12px;
  padding: 8px;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 4px;
  position: relative;
}

.dim-box {
  background: #f97316;
  border: 2px solid #ea580c;
  border-radius: 4px;
  padding: 10px 12px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  box-sizing: border-box;
  line-height: 1.5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

/* auto：块级元素默认占满 */
.dim-box--auto {
  display: block;
}

/* stretch */
.dim-box--stretch {
  display: block;
}

/* max-content：内容不换行 */
.dim-box--max-content {
  white-space: nowrap;
}

/* min-content：内容收缩到最小 */
.dim-box--min-content {
  word-break: break-all;
}

/* fit-content */
.dim-box--fit-content {
  display: block;
}

/* inherit */
.dim-box--inherit {
  display: block;
}

/* 50% */
.dim-box--50\% {
  display: block;
}

.dim-footer {
  padding: 0 14px 10px;
}

.dim-footer p {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .dimension-demo {
    grid-template-columns: 1fr;
  }
}
</style>
