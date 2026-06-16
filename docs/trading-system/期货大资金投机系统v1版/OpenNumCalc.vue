<script setup lang="ts">
import { computed, ref } from 'vue'

interface VarietyConfig {
  name: string
  prefix: string
  minMove: number
  tickValue: number
  referenceLots: number
  note?: string
}

const CAPITAL = 1_000_000
const RISK_AMOUNT = CAPITAL * 0.01

const varieties: VarietyConfig[] = [
  { name: '焦煤', prefix: 'jm', minMove: 0.5, tickValue: 30, referenceLots: 10, note: '实盘会略微降手数' },
  { name: '焦炭', prefix: 'j', minMove: 0.5, tickValue: 50, referenceLots: 3, note: '实盘会略微降手数' },
  { name: '铁矿石', prefix: 'i', minMove: 0.5, tickValue: 50, referenceLots: 10 },
  { name: '烧碱', prefix: 'SH', minMove: 1, tickValue: 30, referenceLots: 16 },
  { name: '甲醇', prefix: 'MA', minMove: 1, tickValue: 10, referenceLots: 30 },
  { name: '乙二醇', prefix: 'eg', minMove: 1, tickValue: 10, referenceLots: 20 },
  { name: '苯乙烯', prefix: 'eb', minMove: 1, tickValue: 5, referenceLots: 22 },
  { name: 'PTA', prefix: 'TA', minMove: 2, tickValue: 10, referenceLots: 30 },
  { name: '塑料', prefix: 'l', minMove: 1, tickValue: 5, referenceLots: 25 },
  { name: '豆一', prefix: 'a', minMove: 1, tickValue: 10, referenceLots: 20 },
  { name: '菜粕', prefix: 'RM', minMove: 1, tickValue: 10, referenceLots: 40 },
  { name: '橡胶', prefix: 'ru', minMove: 5, tickValue: 50, referenceLots: 5 },
  { name: '菜油', prefix: 'OI', minMove: 1, tickValue: 10, referenceLots: 10 },
  { name: '棕榈油', prefix: 'p', minMove: 2, tickValue: 20, referenceLots: 10 },
  { name: '沪镍', prefix: 'ni', minMove: 10, tickValue: 10, referenceLots: 6 },
  { name: '沪锡', prefix: 'sn', minMove: 10, tickValue: 10, referenceLots: 2 },
  { name: '鸡蛋', prefix: 'jd', minMove: 1, tickValue: 10, referenceLots: 22 },
  { name: '多晶硅', prefix: 'ps', minMove: 5, tickValue: 15, referenceLots: 4, note: '实盘会略微降手数' },
]

const selectedName = ref(varieties[0].name)
const currentPrice = ref<number | null>(1200)

const selectedVariety = computed(
  () => varieties.find((item) => item.name === selectedName.value) ?? varieties[0],
)

const formulaLots = computed(() => {
  const price = currentPrice.value
  const variety = selectedVariety.value

  if (!price || price <= 0) {
    return null
  }

  return Math.floor(
    (RISK_AMOUNT * variety.minMove) / (price * variety.tickValue * 0.01),
  )
})

const onePercentWave = computed(() => {
  const price = currentPrice.value
  const variety = selectedVariety.value

  if (!price || price <= 0) {
    return null
  }

  return (price * variety.tickValue * 0.01) / variety.minMove
})
</script>

<template>
  <div class="open-num-calc">
    <div class="calc-header">
      <div>
        <p class="calc-title">开仓手数计算器</p>
        <p class="calc-subtitle">按 100 万资金、账户波动 1% 对应盘面波动 1% 近似计算。</p>
      </div>
      <div class="capital-card">
        <span class="capital-label">基准资金</span>
        <strong>100 万</strong>
      </div>
    </div>

    <div class="calc-grid">
      <label class="field">
        <span class="field-label">选择品种</span>
        <select v-model="selectedName" class="field-input">
          <option v-for="item in varieties" :key="item.name" :value="item.name">
            {{ item.name }}
          </option>
        </select>
      </label>

      <label class="field">
        <span class="field-label">当前价格</span>
        <input
          v-model.number="currentPrice"
          class="field-input"
          type="number"
          min="0"
          step="0.01"
          placeholder="请输入当前价格"
        />
      </label>

      <div class="field readonly">
        <span class="field-label">合约前缀</span>
        <div class="field-value code">{{ selectedVariety.prefix }}</div>
      </div>

      <div class="field readonly">
        <span class="field-label">最小变动单位</span>
        <div class="field-value">{{ selectedVariety.minMove }}</div>
      </div>

      <div class="field readonly">
        <span class="field-label">一手最小波动</span>
        <div class="field-value">{{ selectedVariety.tickValue }}</div>
      </div>

      <div class="field readonly">
        <span class="field-label">盘面波动 1% / 手</span>
        <div class="field-value">
          {{ onePercentWave === null ? '--' : onePercentWave.toFixed(2) }}
        </div>
      </div>
    </div>

    <div class="result-panel">
      <div class="result-main">
        <span class="result-label">100 万资金开仓手数</span>
        <strong class="result-value">{{ formulaLots === null ? '--' : formulaLots }}</strong>
      </div>
      <div class="result-side">
        <span>文档参考手数：{{ selectedVariety.referenceLots }}</span>
        <span v-if="selectedVariety.note">{{ selectedVariety.note }}</span>
      </div>
    </div>

    <p class="formula-text">
      公式：floor(10000 × 最小变动单位 ÷ (当前价格 × 一手最小波动 × 0.01))
    </p>
  </div>
</template>

<style scoped>
.open-num-calc {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background:
    radial-gradient(circle at top right, color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent), transparent 35%),
    linear-gradient(145deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.calc-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.calc-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.calc-subtitle {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.6;
}

.capital-card {
  min-width: 110px;
  padding: 12px 14px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 20%, var(--vp-c-divider));
  text-align: right;
}

.capital-label {
  margin-right: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.calc-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.field-input,
.field-value {
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
}

.field-input {
  width: 100%;
}

.readonly .field-value {
  display: flex;
  align-items: center;
}

.code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.result-panel {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-top: 18px;
  padding: 16px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 16%, var(--vp-c-divider));
}

.result-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.result-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.result-value {
  font-size: 34px;
  line-height: 1;
  color: var(--vp-c-brand-1);
}

.result-side {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: right;
}

.formula-text {
  margin: 14px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .open-num-calc {
    padding: 16px;
  }

  .calc-header,
  .result-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .calc-grid {
    grid-template-columns: 1fr;
  }

  .capital-card,
  .result-side {
    text-align: left;
  }
}
</style>
