<script setup>
import { ref, onMounted } from 'vue'
import {
  getMemberOrderAPI,
  getPayMockAPI,
  getPayWxPayMiniPayAPI,
  deleteMemberOrderAPI,
} from '@/services/order.js'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//订单状态类表
const orderStateList = [
  { id: 0, text: '' },
  { id: 1, text: '待付款' },
  { id: 2, text: '待发货' },
  { id: 3, text: '待收货' },
  { id: 4, text: '待评价' },
  { id: 5, text: '已完成' },
  { id: 6, text: '已取消' },
]
//定义props
const props = defineProps({ orderState: Number })
// 请求参数
const queryParams = {
  page: 1,
  pageSize: 5,
  orderState: props.orderState,
}
//加载完成标志
const finish = ref(false)
// 获取页面参数
const orderList = ref([])
const getOrderList = async () => {
  const res = await getMemberOrderAPI(queryParams)
  // orderList.value = res.result.items
  //数据累加
  if (!finish.value) {
    orderList.value = orderList.value.concat(...res.result.items)
  }
  if (queryParams.page < res.result.pages) {
    queryParams.page++
  } else {
    finish.value = true
  }
}
const onScrolltolower = () => {
  if (!finish.value) {
    getOrderList()
  }
}

onMounted(() => {
  getOrderList()
})
// 是否为开发环境
const isDev = import.meta.env.DEV
//订单支付
const onOrderPay = async (id) => {
  // 通过环境变量区分开发环境
  if (isDev) {
    // 开发环境：模拟支付，修改订单状态为已支付
    await getPayMockAPI({ orderId: id })
  } else {
    // 生产环境：获取支付参数 + 发起微信支付
    // #ifdef MP-WEIXIN
    const res = await getPayWxPayMiniPayAPI({ orderId: id })
    wx.requestPayment(res.result)
    // #endif
  }
  //成功提示
  uni.showToast({
    title: '支付成功',
  })
  const order = orderList.value.find((v) => v.id === id)
  order.orderState = orderStateList[2].id
}
//删除订单
const onOrderDelete = (id) => {
  uni.showModal({
    content: '是否删除订单',
    success: async (success) => {
      if (success.confirm) {
        await deleteMemberOrderAPI({ ids: [id] })
        uni.redirectTo({ url: '/pagesOrder/list/list' })
      }
    },
  })
}
</script>

<template>
  <scroll-view scroll-y class="orders" enable-back-to-top @scrolltolower="onScrolltolower">
    <view class="card" v-for="item in orderList" :key="item.id" v-if="orderList">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ item.createTime }}</text>
        <!-- 订单状态文字 -->
        <text>{{ orderStateList[item.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <view
          class="text icon-delete"
          v-if="item.orderState >= orderStateList[4].id"
          @tap="onOrderDelete(item.id)"
        ></view>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="sku in item.skus"
        :key="sku.id"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${item.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ item.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"> <text class="symbol">¥</text>{{ item.payMoney.toFixed(2) }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="item.orderState === orderStateList[1].id">
          <view class="button primary" @tap="onOrderPay(item.id)">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${item.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view v-if="item.orderState === orderStateList[3].id" class="button primary"
            >确认收货</view
          >
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ finish ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<style lang="scss">
// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid #ccc;
      font-size: 26rpx;
      color: #444;
    }

    .secondary {
      color: #27ba9b;
      border-color: #27ba9b;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
