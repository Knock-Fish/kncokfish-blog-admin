<template>
    <div class="chart">
        <VChart :option="option" autoresize v-bind="config" />
    </div>
</template>

<script setup lang='ts'>
import VChart from 'vue-echarts'
import type { EChartsOption, SetOptionOpts } from 'echarts/types/dist/shared';
import 'echarts'
interface Porps {
    option: EChartsOption
    config?: SetOptionOpts
}
const porps = defineProps<Porps>()
</script>

<style lang="scss" scoped>
.chart {
    @include card()
}
</style>