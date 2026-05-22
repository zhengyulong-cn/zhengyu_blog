<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// ---- 容器属性 ----
const containerHeight = ref(360)
const flexDirection = ref('row')
const flexWrap = ref('nowrap')
const justifyContent = ref('flex-start')
const alignItems = ref('stretch')
const alignContent = ref('stretch')
const gap = ref(8)

// 是否有多行（wrap 生效时才有）
const hasMultipleLines = computed(() => flexWrap.value !== 'nowrap')

// ---- 项目属性 ----
const selectedItem = ref(0)

interface ItemData {
  order: number
  flexGrow: number
  flexShrink: number
  flexBasis: string
  alignSelf: string
  width: number
  height: number
  padTop: number
  bg: string
}

const items = reactive<ItemData[]>([
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', width: 75, height: 75, padTop: 0, bg: '#f97316' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', width: 95, height: 55, padTop: 15, bg: '#06b6d4' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', width: 65, height: 95, padTop: 5, bg: '#8b5cf6' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', width: 85, height: 65, padTop: 25, bg: '#ec4899' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', width: 105, height: 85, padTop: 10, bg: '#10b981' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', width: 70, height: 100, padTop: 30, bg: '#eab308' },
])

const curItem = computed(() => items[selectedItem.value])

// ---- 容器样式 ----
const containerStyle = computed(() => ({
  display: 'flex' as const,
  flexDirection: flexDirection.value,
  flexWrap: flexWrap.value,
  justifyContent: justifyContent.value,
  alignItems: alignItems.value,
  alignContent: alignContent.value,
  gap: `${gap.value}px`,
  height: `${containerHeight.value}px`,
} as Record<string, string>))

// ---- 项目样式 ----
function getItemStyle(item: ItemData) {
  return {
    width: `${item.width}px`,
    height: `${item.height}px`,
    order: item.order,
    flexGrow: item.flexGrow,
    flexShrink: item.flexShrink,
    flexBasis: item.flexBasis === 'auto' ? 'auto' : item.flexBasis,
    alignSelf: item.alignSelf,
    paddingTop: `${item.padTop}px`,
    backgroundColor: item.bg,
  }
}

// ---- 生成的 CSS 代码 ----
const generatedCSS = computed(() => {
  let css = `.flex-container {\n`
  css += `  display: flex;\n`
  css += `  flex-direction: ${flexDirection.value};\n`
  css += `  flex-wrap: ${flexWrap.value};\n`
  css += `  justify-content: ${justifyContent.value};\n`
  css += `  align-items: ${alignItems.value};\n`
  css += `  align-content: ${alignContent.value};\n`
  if (gap.value > 0) css += `  gap: ${gap.value}px;\n`
  css += `  height: ${containerHeight.value}px;\n`
  css += `}`
  return css
})

// ---- 选项列表 ----
type Option = { value: string; label: string }

const flexDirectionOpts: Option[] = [
  { value: 'row', label: 'row' },
  { value: 'row-reverse', label: 'row-reverse' },
  { value: 'column', label: 'column' },
  { value: 'column-reverse', label: 'column-reverse' },
]
const flexWrapOpts: Option[] = [
  { value: 'nowrap', label: 'nowrap' },
  { value: 'wrap', label: 'wrap' },
  { value: 'wrap-reverse', label: 'wrap-reverse' },
]
const justifyContentOpts: Option[] = [
  { value: 'flex-start', label: 'flex-start' },
  { value: 'flex-end', label: 'flex-end' },
  { value: 'center', label: 'center' },
  { value: 'space-between', label: 'space-between' },
  { value: 'space-around', label: 'space-around' },
  { value: 'space-evenly', label: 'space-evenly' },
]
const alignItemsOpts: Option[] = [
  { value: 'stretch', label: 'stretch' },
  { value: 'flex-start', label: 'flex-start' },
  { value: 'flex-end', label: 'flex-end' },
  { value: 'center', label: 'center' },
  { value: 'baseline', label: 'baseline' },
]
const alignContentOpts: Option[] = [
  { value: 'stretch', label: 'stretch' },
  { value: 'flex-start', label: 'flex-start' },
  { value: 'flex-end', label: 'flex-end' },
  { value: 'center', label: 'center' },
  { value: 'space-between', label: 'space-between' },
  { value: 'space-around', label: 'space-around' },
  { value: 'space-evenly', label: 'space-evenly' },
]
const alignSelfOpts: Option[] = [
  { value: 'auto', label: 'auto' },
  { value: 'stretch', label: 'stretch' },
  { value: 'flex-start', label: 'flex-start' },
  { value: 'flex-end', label: 'flex-end' },
  { value: 'center', label: 'center' },
  { value: 'baseline', label: 'baseline' },
]
</script>

<template>
  <div class="flex-demo-panel">
    <!-- ====== 预览区 ====== -->
    <div class="preview-section">
      <div class="flex-container" :style="containerStyle">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="flex-item"
          :class="{ selected: selectedItem === i }"
          :style="getItemStyle(item)"
          @click="selectedItem = i"
        >
          {{ i + 1 }}
        </div>
      </div>
    </div>

    <!-- ====== 属性面板 ====== -->
    <div class="controls-wrapper">
      <!-- 容器属性 -->
      <fieldset class="control-group">
        <legend>容器属性 Container</legend>

        <div class="property-row">
          <label class="prop-label">flex-direction</label>
          <div class="radio-pill-group">
            <button
              v-for="opt in flexDirectionOpts"
              :key="opt.value"
              class="pill"
              :class="{ active: flexDirection === opt.value }"
              @click="flexDirection = opt.value"
            >{{ opt.label }}</button>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">flex-wrap</label>
          <div class="radio-pill-group">
            <button
              v-for="opt in flexWrapOpts"
              :key="opt.value"
              class="pill"
              :class="{ active: flexWrap === opt.value }"
              @click="flexWrap = opt.value"
            >{{ opt.label }}</button>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">justify-content</label>
          <div class="radio-pill-group">
            <button
              v-for="opt in justifyContentOpts"
              :key="opt.value"
              class="pill"
              :class="{ active: justifyContent === opt.value }"
              @click="justifyContent = opt.value"
            >{{ opt.label }}</button>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">align-items</label>
          <div class="radio-pill-group">
            <button
              v-for="opt in alignItemsOpts"
              :key="opt.value"
              class="pill"
              :class="{ active: alignItems === opt.value }"
              @click="alignItems = opt.value"
            >{{ opt.label }}</button>
          </div>
          <span v-if="hasMultipleLines" class="hint">（align-content 生效时此属性不生效）</span>
        </div>

        <div class="property-row">
          <label class="prop-label">align-content</label>
          <div class="radio-pill-group">
            <button
              v-for="opt in alignContentOpts"
              :key="opt.value"
              class="pill"
              :class="{ active: alignContent === opt.value }"
              @click="alignContent = opt.value"
            >{{ opt.label }}</button>
          </div>
          <span v-if="!hasMultipleLines" class="hint">（需先设置 flex-wrap ≠ nowrap）</span>
        </div>

        <div class="property-row range-row">
          <label class="prop-label">gap: {{ gap }}px</label>
          <input type="range" v-model.number="gap" min="0" max="60" step="2" class="range-input" />
          <span class="hint">0 - 60px</span>
        </div>
      </fieldset>

      <!-- 项目属性 -->
      <fieldset class="control-group">
        <legend>项目属性 Item（点击预览中的盒子选择，当前：第 {{ selectedItem + 1 }} 个）</legend>

        <div class="property-row">
          <label class="prop-label">选择项目</label>
          <div class="radio-pill-group">
            <button
              v-for="i in 6"
              :key="i"
              class="pill"
              :class="{ active: selectedItem === i - 1 }"
              @click="selectedItem = i - 1"
            >{{ i }}</button>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">align-self</label>
          <div class="radio-pill-group">
            <button
              v-for="opt in alignSelfOpts"
              :key="opt.value"
              class="pill"
              :class="{ active: curItem.alignSelf === opt.value }"
              @click="curItem.alignSelf = opt.value"
            >{{ opt.label }}</button>
          </div>
          <span v-if="hasMultipleLines" class="hint">（align-content 生效时不生效）</span>
        </div>

        <div class="property-row">
          <label class="prop-label">order</label>
          <div class="inline-control">
            <input type="number" v-model.number="curItem.order" class="num-input" min="-9" max="9" />
            <span class="hint">越小越靠前，可为负数</span>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">flex-grow</label>
          <div class="inline-control">
            <input type="number" v-model.number="curItem.flexGrow" class="num-input" min="0" max="10" step="0.5" />
            <span class="hint">放大比例，默认 0</span>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">flex-shrink</label>
          <div class="inline-control">
            <input type="number" v-model.number="curItem.flexShrink" class="num-input" min="0" max="10" step="0.5" />
            <span class="hint">缩小比例，默认 1</span>
          </div>
        </div>

        <div class="property-row">
          <label class="prop-label">flex-basis</label>
          <div class="inline-control">
            <select v-model="curItem.flexBasis" class="select-input">
              <option value="auto">auto</option>
              <option value="40px">40px</option>
              <option value="80px">80px</option>
              <option value="120px">120px</option>
              <option value="160px">160px</option>
              <option value="200px">200px</option>
            </select>
            <span class="hint">主轴方向上的初始大小</span>
          </div>
        </div>
      </fieldset>

      <!-- CSS 代码 -->
      <fieldset class="control-group css-output-group">
        <legend>生成的 CSS</legend>
        <pre class="css-code"><code>{{ generatedCSS }}</code></pre>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
.flex-demo-panel {
  margin: 16px 0;
  font-size: 14px;
}

/* ====== 预览区 ====== */
.preview-section {
  position: relative;
  margin-bottom: 16px;
  overflow: auto;
}

.axis-indicators {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  user-select: none;
  pointer-events: none;
}

.flex-container {
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 4px;
  box-sizing: border-box;
  transition: all 0.25s ease;
  min-width: 0;
}

.flex-item {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  border: 2px solid transparent;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  box-sizing: border-box;
  user-select: none;
  flex-shrink: 0;
}
.flex-item:hover {
  transform: scale(1.06);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.flex-item.selected {
  border-color: #fff;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.3);
}

/* ====== 控制面板 ====== */
.controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.control-group {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 0;
}

.control-group legend {
  font-weight: 700;
  font-size: 15px;
  color: var(--vp-c-brand-1);
  padding: 0 6px;
}

.property-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
  min-height: 30px;
}

.prop-label {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 120px;
  white-space: nowrap;
}

/* ====== 药丸按钮组 ====== */
.radio-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.pill {
  padding: 3px 10px;
  font-size: 12px;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.pill:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.pill.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

/* ====== 内联控件 ====== */
.inline-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.num-input {
  width: 72px;
  padding: 4px 8px;
  font-size: 13px;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: center;
}

.select-input {
  padding: 4px 8px;
  font-size: 13px;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.range-row {
  gap: 12px;
}

.range-input {
  flex: 1;
  max-width: 200px;
  accent-color: var(--vp-c-brand-1);
}

.hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-style: italic;
}

/* ====== CSS 代码 ====== */
.css-output-group {
  background: var(--vp-code-block-bg);
}

.css-code {
  margin: 0;
  padding: 12px 16px;
  background: var(--vp-code-block-bg);
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.7;
}

.css-code code {
  color: var(--vp-code-text);
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
}
</style>
