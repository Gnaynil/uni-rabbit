<script setup>
import { ref } from 'vue'
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile.js'
import { useMemberStore } from '@/stores/member.js'
import { onLoad } from '@dcloudio/uni-app'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//获取本地用户数据
const memberStore = useMemberStore()
//获取数据
const profile = ref({})
const getUserData = async () => {
  const res = await getMemberProfileAPI()
  profile.value = res.result
  // #ifdef H5
  //返回数据没有countyCode 所以需要要在云函数通过fullLocation来获取code字段
  console.log(profile.value.fullLocation.split(' ')[2])
  const db = uniCloud.database()
  //筛查符合的字段
  db.collection('opendb-city-china')
    .where({ name: profile.value.fullLocation.split(' ')[2] })
    .get()
    .then((res) => {
      profile.value.countyCode = res.result.data[0].code
    })
  // #endif
}
onLoad(() => {
  getUserData()
})

//修改用户头像
const onAvatarChange = () => {
  // #ifdef MP-WEIXIN
  //调用用户的照片或者拍照
  uni.chooseMedia({
    //文件个数
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      //本地路径
      const { tempFilePath } = res.tempFiles[0]
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file', //后端数据字段名
        filePath: tempFilePath, //新头像
        success: (res) => {
          // console.log(res)
          if (res.statusCode === 200) {
            const { avatar } = JSON.parse(res.data).result
            // 当前页面更新头像
            profile.value.avatar = avatar
            // 更新 Store 头像
            memberStore.profile.avatar = avatar
            uni.showToast({ icon: 'success', title: '更新成功' })
          } else {
            uni.showToast({ icon: 'error', title: '出现错误' })
          }
        },
      })
    },
  })
  // #endif
}
//修改性别
const onGenderChange = (e) => {
  profile.value.gender = e.detail.value
}
//获取当前日期为YYYY-MM-DD格式
const nowDate = new Date()
const year = nowDate.getFullYear()
const month = (nowDate.getMonth() + 1).toString().padStart(2, '0') //月份从0开始 补齐两位格式
const day = nowDate.getDay().toString().padStart(2, '0') //补齐两位格式
//返回正确格式
const formatNowDate = `${year}-${month}-${day}`

//修改生日
const onBirthdayChange = (e) => {
  console.log(profile.value)
  profile.value.birthday = e.detail.value
}
let fullLocationCode = ['', '', '']
// #ifdef MP-WEIXIN
//修改地址
const onFullLocationChange = (e) => {
  //修改前端界面
  profile.value.fullLocation = e.detail.value.join(' ')
  //提交后端更新
  fullLocationCode = e.detail.code
}
// #endif

//修改地址
// #ifdef H5
const onCitychange = (e) => {
  const code = e.detail.value.map((v) => v.value)
  fullLocationCode = code
}
// #endif

//点击保存提交表单
const onSubmit = async () => {
  const { nickname, gender, birthday, profession } = profile.value
  let res = {}
  console.log(fullLocationCode)
  //判断是否更改城市 更改了上传code
  if (fullLocationCode[0]) {
    res = await putMemberProfileAPI({
      nickname,
      gender,
      birthday,
      profession,
      provinceCode: fullLocationCode[0],
      cityCode: fullLocationCode[1],
      countyCode: fullLocationCode[2],
    })
  } else {
    res = await putMemberProfileAPI({
      nickname,
      gender,
      birthday,
      profession,
    })
  }
  memberStore.profile.nickname = res.result.nickname
  memberStore.profile.profession = res.result.profession
  uni.showToast({ icon: 'success', title: '更新成功' })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="onAvatarChange">
        <image class="image" :src="profile.avatar" mode="aspectFill" />
        <!-- #ifdef MP-WEIXIN -->
        <text class="text">点击修改头像</text>
        <!-- #endif -->
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="formatNowDate"
            :value="profile.birthday"
            @change="onBirthdayChange"
          >
            <view v-if="profile.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="profile.fullLocation?.split(' ')"
            @change="onFullLocationChange"
          >
            <view v-if="profile.fullLocation">{{ profile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view class="form-item">
          <text class="label">城市</text>
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
            v-model="profile.countyCode"
          >
          </uni-data-picker>
          <!-- #endif -->
        </view>
        <!-- #endif -->
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
