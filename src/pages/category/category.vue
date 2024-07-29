//分类页 通过顶部高度设置一二级分类的响应式
<script setup>
import { ref, computed, nextTick } from 'vue'
import { getHomeBannerAPI } from '@/services/home.js'
import { getCategoryTopAPI } from '@/services/category.js'
import { onLoad } from '@dcloudio/uni-app'
import PageSkeleton from './components/PageSkeleton.vue'
//获取分类轮播图
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getHomeBannerAPI(2)
  bannerList.value = res.result
}
//获取一级分类数据
const categoryTopList = ref([])
const getCategoryTopList = async () => {
  const res = await getCategoryTopAPI()
  categoryTopList.value = res.result
}
//获取一级分类中子集的数量
const categoryNumber = computed(() =>
  categoryTopList.value.map((item) => {
    return item.children.length
  }),
)
//一级分类活跃状态响应式变量
const activeIndex = ref(0)
// //提取二级分类数据
const subCategoryList = computed(() => {
  //返回一个筛选出的新数组（二级分类的数据
  return categoryTopList.value.flatMap((item) => item.children)
})
//数据是否加载完毕
const isFinish = ref(false)
//实际高度
const actualHeight = ref(0)
//滚动高度数组
const categoryHeight = ref([0])
//二级分类子集中的索引值
const categoryIndex = ref(0)
//获取每一项的滚动高度
const getCategoryHeight = () => {
  //nextTick：在Dom更新完成后获取Dom节点
  nextTick(() => {
    // 创建一个SelectorQuery对象实例
    const query = uni.createSelectorQuery()
    // 总高度变量
    let totalHeight = 0
    // 遍历二级分类列表，使用.select为每个二级分类创建一个NodesRef对象实例存放到SelectorQuery对象实例
    subCategoryList.value.forEach((item, index) => {
      //根据ID匹配 .boundingClientRect()添加节点布局位置从而获取元素尺寸和位置
      query.select(`#category-${index}`).boundingClientRect()
    })
    // 初始化索引变量
    let index = 0
    // 执行请求
    query.exec((res) => {
      //遍历所有对象获取节点信息
      res.forEach((rect) => {
        if (rect) {
          // 累加当前分类的高度
          totalHeight += rect.height
          // 判断当前索引值是否等于一级里的二级分类数量和
          if (index === categoryNumber.value[categoryIndex.value]) {
            categoryIndex.value++
            index = 0
            // 将当前总高度存入数组 因为存在误差所以减去590个像素点
            categoryHeight.value.push(totalHeight - 590)
          }
          index++
        }
      })
    })
  })
}
onLoad(async () => {
  //获取banner和分类数据
  await Promise.all([getBannerList(), getCategoryTopList()])
  //加载完毕
  isFinish.value = true
  await getCategoryHeight()
})
const scrollToView = ref('')
const categoryChange = (index) => {
  activeIndex.value = index
  //根据每个一级分类内的子集获取每个大类第一个的位置 例如到达category-7第二个大类的首个节点
  scrollToView.value = `category-${categoryNumber.value
    .slice(0, index)
    .reduce((acc, curr) => acc + curr, 0)}`
}

const onScroll = (e) => {
  const scrollTop = e.detail.scrollTop
  //根据滚动条位置 设置一级分类状态
  for (let i = 0; i < categoryHeight.value.length; i++) {
    //根据分类高度进行判断
    if (scrollTop >= categoryHeight.value[i] && scrollTop < categoryHeight.value[i + 1]) {
      activeIndex.value = i
      break
    } else if (i === categoryHeight.value.length - 1 && scrollTop >= categoryHeight.value[i]) {
      activeIndex.value = i
      break
    }
  }
}
</script>

<template>
  <view class="viewport" v-if="isFinish">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryTopList"
          :key="item.id"
          class="item"
          :class="{ active: index === activeIndex }"
          @tap="categoryChange(index)"
        >
          <text class="name"> {{ item.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <!-- 焦点图 -->
      <view class="secondary">
        <view class="banner">
          <XtxSwiper :data="bannerList" />
        </view>
        <scroll-view scroll-y @scroll="onScroll" :scroll-into-view="scrollToView">
          <!-- 内容区域 -->
          <view
            class="panel"
            v-for="(item, index) in subCategoryList"
            :key="item.id"
            :id="`category-${index}`"
          >
            <view class="title">
              <text class="name">{{ item.name }}</text>
              <!-- <navigator class="more" hover-class="none">全部</navigator> -->
            </view>
            <view class="section">
              <navigator
                v-for="goods in item.goods"
                :key="goods.id"
                class="goods"
                hover-class="none"
                :url="`/pages/goods/goods?id=${goods.id}`"
              >
                <image class="image" :src="goods.picture"></image>
                <view class="name ellipsis">{{ goods.name }}</view>
                <view class="price">
                  <text class="symbol">¥</text>
                  <text class="number">{{ goods.price }}</text>
                </view>
              </navigator>
            </view>
          </view>
          <view class="footer">--已经到底啦--</view>
        </scroll-view>
      </view>
    </view>
  </view>
  <!-- #ifdef MP-WEIXIN -->
  <PageSkeleton v-else />
  <!-- #endif -->
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: calc(100% - 202rpx);
  display: flex;
  flex-direction: column;
}
.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}
.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}
/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}
/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
  height: 100vh;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
    font-size: 26rpx;
    color: #595c63;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 42rpx;
      bottom: 0;
      width: 96rpx;
      border-top: 1rpx solid #e3e4e7;
    }
  }
  .active {
    background-color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rpx;
      height: 100%;
      background-color: #27ba9b;
    }
  }
}
.primary .item:last-child::after,
.primary .active::after {
  display: none;
}

/* 二级分类 */
.secondary {
  background-color: #fff;
  position: relative;
  // overflow: auto;
  .banner {
    margin-bottom: 20px;
  }
  .carousel {
    height: 200rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 4rpx;
    // overflow: hidden;
  }
  .panel {
    margin: 0 30rpx 0rpx;
  }
  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;
    background-color: #fff;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 999;
    .more {
      float: right;
      padding-left: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }
  .section {
    // #ifdef H5
    width: 110% !important;
    // #endif
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .goods {
      width: 150rpx;
      margin: 0rpx 30rpx 20rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        // #ifdef H5
        height: 66rpx;
        // #endif
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }
      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }
      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
  .footer {
    position: absolute;
    left: 32%;
    color: #e2e2e2;
    padding-bottom: 100rpx;
  }
}
</style>
