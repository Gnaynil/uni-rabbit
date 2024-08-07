<script setup>
import { computed, ref } from 'vue'
import {
  getMemberOrderPreAPI,
  getMemberOrderPreNowAPI,
  postMemberOrderAPI,
  getMemberOrderPreAgainAPI,
} from '@/services/order.js'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useAddressStore } from '@/stores/address.js'
const orderList = ref([])

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单备注
const buyerMessage = ref('')
// 配送时间
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
// 当前配送时间下标
const activeIndex = ref(0)
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])
// 修改配送时间
const onChangeDelivery = (ev) => {
  activeIndex.value = ev.detail.value
}

//获取立即购买数据
const query = defineProps({
  skuId: {
    type: String,
    default: '',
  },
  count: {
    type: String,
    default: '',
  },
  addressId: {
    type: String,
    default: '',
  },
  //再次购买Id
  orderId: {
    type: String,
  },
})
console.log(query.orderId)
//获取订单信息
const getOrderList = async () => {
  console.log(query.orderId)
  if (query.skuId && query.count) {
    //通过skuId addressId获取立即购买所需其他数据信息
    const res = await getMemberOrderPreNowAPI({
      count: query.count,
      skuId: query.skuId,
      addressId: query.addressId,
    })
    orderList.value = res.result
    // console.log(orderList.value)
  }
  //再次购买 通过id获取其他数据
  else if (query.orderId) {
    const res = await getMemberOrderPreAgainAPI(query.orderId)
    orderList.value = res.result
  } else {
    //获取购物车里订单信息
    const res = await getMemberOrderPreAPI()
    orderList.value = res.result
    // console.log(orderList.value)
  }
}
//页面展示时调用
onShow(() => getOrderList())
//初始化收货地址
onLoad(() => {
  addressStore.selectedAddress = undefined
})
//计算默认收货地址
const addressStore = useAddressStore()
const selectedAddress = computed(() => {
  //判断是立即购买里转入 还是从购物车转入
  if (orderList.value?.userAddresses?.length === 1) {
    return addressStore.selectedAddress?.id
      ? addressStore.selectedAddress
      : orderList.value?.userAddresses[0]
  } else {
    return addressStore.selectedAddress?.id
      ? addressStore.selectedAddress
      : orderList.value?.userAddresses?.find((v) => v.isDefault)
  }
})

//提交订单
const onOrderSubmit = async () => {
  //没有收货地址提醒
  if (!selectedAddress.value.id) {
    return uni.showToast({
      icon: 'none',
      title: '请选择收货地址',
    })
  }
  //发送请求
  const res = await postMemberOrderAPI({
    addressId: selectedAddress.value.id,
    buyerMessage: buyerMessage.value,
    deliveryTimeType: activeDelivery.value.type,
    goods: orderList.value.goods.map((v) => {
      return { count: v.count, skuId: v.skuId }
    }),
    payChannel: 2,
    payType: 1,
  })
  // 关闭当前页面，跳转到订单详情，传递订单id
  uni.redirectTo({
    url: `/pagesOrder/detail/detail?id=${res.result.id}`,
  })
}
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator
      v-if="selectedAddress"
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="user"> {{ selectedAddress.receiver }} {{ selectedAddress.contact }} </view>
      <view class="address">
        {{ selectedAddress.fullLocation + ' ' + selectedAddress.address }}</view
      >
      <text class="icon icon-right"></text>
    </navigator>
    <navigator
      v-else
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="address"> 请选择收货地址 </view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in orderList.goods"
        :key="item.id"
        :url="`/pages/goods/goods?id=${item.id}`"
        class="item"
        hover-class="none"
      >
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name ellipsis"> {{ item.name }} </view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.payPrice }}</view>
            <view class="price symbol">{{ item.price }}</view>
          </view>
          <view class="count">{{ item.count }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ activeDelivery.text }}</view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input
          class="input"
          :cursor-spacing="30"
          placeholder="选填，建议留言前先与商家沟通确认"
          v-model="buyerMessage"
        />
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ orderList?.summary?.totalPrice.toFixed(2) }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ orderList?.summary?.postFee.toFixed(2) }}</text>
      </view>
    </view>
  </scroll-view>

  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ orderList.summary?.totalPayPrice.toFixed(2) }}</text>
    </view>
    <view class="button" :class="{ disabled: selecteAddress?.id }" @tap="onOrderSubmit">
      提交订单
    </view>
  </view>
  <!-- 底部占位空盒子 -->
  <view class="toolbar-height"></view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.symbol::before {
  content: '¥';
  font-size: 80%;
  margin-right: 5rpx;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png)
    20rpx center / 50rpx no-repeat #fff;
  position: relative;

  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }

  .user {
    color: #333;
    margin-bottom: 5rpx;
  }

  .address {
    color: #666;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;

    &:first-child {
      border-top: none;
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;

      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}

.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }

  .item .text {
    width: 125rpx;
  }

  .picker {
    color: #666;
  }

  .picker::after {
    content: '\e6c2';
  }
}

/* 结算清单 */
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  // padding-bottom: 100px;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .danger {
    color: #cf4444;
  }
}

/* 吸底工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
// 底部占位空盒子
.toolbar-height {
  height: 165rpx;
}
</style>
