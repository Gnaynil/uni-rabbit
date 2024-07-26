<script setup>
import { ref } from 'vue'
import CustomNavBar from './components/CustomNavBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotItemAPI } from '@/services/home.js'
import { useGuessList } from '@/composables/index.js'
import { onLoad } from '@dcloudio/uni-app'
import PageSkeleton from './components/PageSkeleton.vue'
const Info = uni.getSystemInfoSync()
//获取轮播图数据
const bannerList = ref([])
const getBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

//获取前台分类
const categoryList = ref([])
const getCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

//获取热门推荐
const hotList = ref([])
const getHotData = async () => {
  const res = await getHomeHotItemAPI()
  hotList.value = res.result
}
// 是否加载中标记
const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getBannerData(), getCategoryData(), getHotData()])
  isLoading.value = false
})
//滚动触底触发
const { guessRef, onScrolltolower } = useGuessList()
// 当前下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData()
  await Promise.all([getBannerData(), getCategoryData(), getHotData(), guessRef.value?.getMore()])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <CustomNavBar />
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    scroll-y
    enable-back-to-top
    class="scroll-view"
  >
  <template v-if="!isLoading">
    <XtxSwiper :data="bannerList" />
    <CategoryPanel :categoryList="categoryList" />
    <HotPanel :hotList="hotList" />
    <!-- 绑定组件ref -->
    <XtxGuess ref="guessRef" class="guess" />
  </template>
    <!-- #ifdef MP-WEIXIN -->
    <PageSkeleton v-else />
    <!-- #endif -->



  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
  padding-bottom: v-bind("88+Info.statusBarHeight+'px'");
}
</style>
