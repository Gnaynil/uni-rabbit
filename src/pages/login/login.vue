<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { postLoginWxMin, postLoginWxMinSimpleAPI, PostLoginAPI } from '@/services/login.js'
import { useMemberStore } from '@/stores/member.js'
import { ref } from 'vue'
// 获取code登录凭证
// #ifdef MP-WEIXIN
let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})
// 获取用户手机号码(生产环境)
const onGetPhoneNumber = async (ev) => {
  console.log(ev)
  const encryptedData = ev.datail.encryptedData
  const iv = ev.datail.iv
  const res = await postLoginWxMinAPI({
    code,
    encryptedData,
    iv,
  })
  loginSuccess(res.result)
}
// #endif

//模拟手机号码快捷登录(开发环境)
const onGetPhoneNuberSimple = async () => {
  const res = await postLoginWxMinSimpleAPI('13856258291')
  loginSuccess(res.result)
}
//传统登录
const form = ref({
  account: '12056258291',
  password: 'hm#qd@23!',
})
const doLogin = async () => {
  const res = await PostLoginAPI({ account: form.value.account, password: form.value.password })
  loginSuccess(res.result)
}

const loginSuccess = (profile) => {
  // 保存用户信息
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  uni.showToast({
    icon: 'none',
    title: '登录成功',
  })
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/my/my',
    })
  }, 500)
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image>
    </view>
    <view class="login">
      <!-- #ifdef H5 -->
      <!-- 网页端表单登录 -->
      <input class="input" type="text" v-model="form.account" placeholder="请输入用户名/手机号码" />
      <input class="input" type="text" v-model="form.password" password placeholder="请输入密码" />
      <button class="button phone" @tap="doLogin">登录</button>
      <!-- #endif -->
      <!-- 小程序端授权登录 -->
      <!-- 微信开发能力按钮，需要条件编译 -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="doLogin">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
