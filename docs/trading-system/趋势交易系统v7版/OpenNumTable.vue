<script setup lang="ts">
import { computed, ref } from 'vue'

interface VarietyConfig {
  name: string
  prefix: string
  minMove: number
  tickValue: number
  calcLots: number
  preferenceLots?: number
}

const varieties: VarietyConfig[] = [
  { name: '焦煤', prefix: 'jm', minMove: 0.5, tickValue: 30, calcLots: 10 },
  { name: '焦炭', prefix: 'j', minMove: 0.5, tickValue: 50, calcLots: 4 },
  { name: '铁矿石', prefix: 'i', minMove: 0.5, tickValue: 50, calcLots: 12 },
  { name: '硅铁', prefix: 'SF', minMove: 2, tickValue: 10, calcLots: 32 },
  { name: '不锈钢', prefix: 'ss', minMove: 5, tickValue: 25, calcLots: 14 },
  { name: '纯碱', prefix: 'SA', minMove: 1, tickValue: 20, calcLots: 14 },
  { name: '玻璃', prefix: 'FG', minMove: 1, tickValue: 20, calcLots: 14 },
  { name: '烧碱', prefix: 'SH', minMove: 1, tickValue: 30, calcLots: 16 },
  { name: '甲醇', prefix: 'MA', minMove: 1, tickValue: 10, calcLots: 35 },
  { name: '乙二醇', prefix: 'eg', minMove: 1, tickValue: 10, calcLots: 20 },
  { name: 'PTA', prefix: 'TA', minMove: 2, tickValue: 10, calcLots: 30 },
  { name: '豆一', prefix: 'a', minMove: 1, tickValue: 10, calcLots: 20 },
  { name: '菜粕', prefix: 'RM', minMove: 1, tickValue: 10, calcLots: 40 },
  { name: '橡胶', prefix: 'ru', minMove: 5, tickValue: 50, calcLots: 5 },
  { name: '菜油', prefix: 'OI', minMove: 1, tickValue: 10, calcLots: 10 },
  { name: '棕榈油', prefix: 'p', minMove: 2, tickValue: 20, calcLots: 10 },
  { name: '沪银', prefix: 'ag', minMove: 1, tickValue: 15, calcLots: 3 },
  { name: '沪镍', prefix: 'ni', minMove: 10, tickValue: 10, calcLots: 6 },
  { name: '沪锡', prefix: 'sn', minMove: 10, tickValue: 10, calcLots: 2 },
  { name: '鸡蛋', prefix: 'jd', minMove: 1, tickValue: 10, calcLots: 22 },
  { name: '多晶硅', prefix: 'ps', minMove: 5, tickValue: 15, calcLots: 4 },
]
</script>

<template>
  <div class="open-num-calc">
    pppppppp
  </div>
</template>

<style scoped>
</style>
