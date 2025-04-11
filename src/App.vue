<script setup lang="ts">
import { zhCn } from 'element-plus/es/locales.mjs';

</script>

<template>
  <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4816338_3oteg8wwsri.css" />
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
