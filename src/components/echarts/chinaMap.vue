<template>
  <publicVue :optionData="optionData" type="china-map"></publicVue>
</template>
<script setup lang="ts">
import publicVue from '../publicVue.vue'
import chinaGeoJSON from '@/assets/geojson/china.json'
const optionData = {
  title: {
    text: 'Weekly Sales',
    subtext: 'Data Source: Weekly Sales',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>Sales: {c} (Units)',
  },
  visualMap: {
    min: 100,
    max: 300,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4'],
    },
  },
  geo: {
    map: 'china',
    roam: true,
    label: {
      show: true,
      fontSize: 10,
    },
    emphasis: {
      label: {
        show: true,
        color: 'black',
      },
      itemStyle: {
        areaColor: '#f4cccc',
      },
    },
    itemStyle: {
      areaColor: '#E5EFF7',
      borderColor: '#4A6572',
    },
  },
  series: [
    {
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      data: [
        { name: '北京', value: 280 },
        { name: '上海', value: 230 },
        { name: '广东', value: 218 },
        { name: '浙江', value: 224 },
        { name: '江苏', value: 200 },
        { name: '四川', value: 150 },
        { name: '湖北', value: 180 },
      ],
      // 热力效果增强配置
      emphasis: {
        label: {
          show: true,
          color: '#fff',
        },
      },
    },
  ],
}
</script>
