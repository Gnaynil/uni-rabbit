<script setup>
import { ref } from 'vue'
import {
  postMemberAddressAPI,
  getMemberAddressByIdAPI,
  putMemberAddressByIdAPI,
} from '@/services/address.js'
import { onLoad } from '@dcloudio/uni-app'
const query = defineProps({
  id: {
    type: String,
    default: '',
  },
})

uni.setNavigationBarTitle({
  title: query.id ? '修改地址' : '新建地址',
})
// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
//定义校验规则
const rules = {
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  fullLocation: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请输入详细地址' }],
  },
}

// #ifdef MP-WEIXIN
const onFullLocationChange = (e) => {
  form.value.provinceCode = e.detail.code[0]
  form.value.cityCode = e.detail.code[1]
  form.value.countyCode = e.detail.code[2]
  form.value.fullLocation = e.detail.value.join(' ')
}
// #endif

// #ifdef H5
const onCitychange = (e) => {
  const code = e.detail.value.map((v) => v.value)
  const [provinceCode, cityCode, countyCode] = code
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
  form.value.fullLocation = e.detail.value.map((v) => v.text).join(' ')
  console.log(form.value)
}
// #endif

const onSwitchChange = (e) => {
  if (e.detail.value) {
    form.value.isDefault = 1
  } else {
    form.value.isDefault = 0
  }
  //保存地址
}
//表单组件实例
const formRef = ref()
const SaveAddress = async () => {
  try {
    await formRef.value.validate()
    //修改地址
    if (query.id) {
      await putMemberAddressByIdAPI(query.id, form.value)
      uni.showToast({
        title: '修改成功',
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
    //添加地址
    else {
      await postMemberAddressAPI(form.value)
      uni.showToast({
        title: '添加成功',
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
  } catch (e) {
    uni.showToast({
      icon: 'error',
      title: '请填写完整信息',
    })
  }
}

//修改地址获取数据
const getAddress = async () => {
  const res = await getMemberAddressByIdAPI(query.id)
  form.value = res.result
}
//数据是否加载完毕
const isFinish = ref(false)
onLoad(async () => {
  if (query.id) {
    await getAddress()
    isFinish.value = true
  }
  else{
    isFinish.value = true
  }
})
</script>

<template>
  <view class="content" v-if="isFinish">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item name="contact" class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item name="fullLocation" class="form-item">
        <text class="label">所在地区</text>
        <!-- #ifdef MP-WEIXIN -->
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation?.split(' ')"
          @change="onFullLocationChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
        <!-- #endif-->
        <!-- #ifdef H5 -->
        <uni-data-picker
          placeholder="请选择地址"
          popup-title="请选择城市"
          collection="opendb-city-china"
          field="code as value, name as text"
          orderby="value asc"
          :step-searh="true"
          self-field="code"
          parent-field="parent_code"
          :clear-icon="false"
          @change="onCitychange"
          v-model="form.countyCode"
        >
        </uni-data-picker>
        <!-- #endif -->
      </uni-forms-item>
      <uni-forms-item class="form-item" name="address">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          @change="onSwitchChange"
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault === 1"
        />
      </view>
    </uni-forms>
    <!-- 提交按钮 -->
  </view>
  <button class="button" @tap="SaveAddress" v-if="isFinish">保存并使用</button>
</template>

<style lang="scss">
/* #ifdef H5 */
:deep(.selected-area) {
  height: auto;
  flex: 0 1 auto;
}
/* #endif */

page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
