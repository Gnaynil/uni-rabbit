<script setup>
  import { ref } from 'vue';
  import CustomNavBar from './components/CustomNavBar.vue'
  import {getHomeBannerAPI} from '@/services/home.js'
  import { onLoad } from '@dcloudio/uni-app';
  const banner = ref([]);
  const getData = async () => {
    const res = await getHomeBannerAPI()
    banner.value = res.result
  }
  onLoad(getData())
</script>

<template>
  <CustomNavBar />
  <XtxSwiper :data="banner" />
  <view class="index">index</view>
</template>

<style lang="scss">
  //
</style>
