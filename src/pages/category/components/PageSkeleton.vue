<template name="skeleton">
  <view class="sk-container">
    <view class="viewport viewport">
      <view class="search search">
        <view class="input input">
          <text
            class="icon-search sk-transparent sk-text-14-2857-506 sk-text sk-pseudo sk-pseudo-circle"
            >女靴</text
          >
        </view>
      </view>
      <view class="categories categories">
        <scroll-view scroll-y="true" class="primary primary">
          <view class="item active sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-220 sk-text">居家</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-882 sk-text">美食</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-424 sk-text">服饰</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-875 sk-text">母婴</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-425 sk-text">个护</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-270 sk-text">严选</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-901 sk-text">数码</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-786 sk-text">运动</text>
          </view>
          <view class="item sk-pseudo sk-pseudo-circle">
            <text class="name sk-transparent sk-text-14-2857-911 sk-text">杂项</text>
          </view>
        </scroll-view>
        <view class="secondary secondary">
          <view class="banner banner">
            <view is="components/XtxSwiper">
              <view class="carousel XtxSwiper--carousel">
                <swiper circular="true" interval="3000" current="0" autoplay="false">
                  <swiper-item
                    style="
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      transform: translate(0%, 0px) translateZ(0px);
                    "
                  >
                    <navigator class="navigator XtxSwiper--navigator" hover-class="none">
                      <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
                    </navigator>
                  </swiper-item>
                  <swiper-item
                    style="
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      transform: translate(100%, 0px) translateZ(0px);
                    "
                  >
                    <navigator class="navigator XtxSwiper--navigator" hover-class="none">
                      <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
                    </navigator>
                  </swiper-item>
                </swiper>
                <view class="indicator XtxSwiper--indicator">
                  <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
                  <text class="dot XtxSwiper--dot"></text>
                  <text class="dot XtxSwiper--dot"></text>
                  <text class="dot XtxSwiper--dot"></text>
                  <text class="dot XtxSwiper--dot"></text>
                </view>
              </view>
            </view>
          </view>
          <scroll-view scroll-y="true" scroll-into-view="category-0">
            <view class="panel panel" id="category-0">
              <view class="title title">
                <text class="name sk-transparent sk-text-26-4706-943 sk-text">居家生活用品</text>
              </view>
              <view class="section section">
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-750 sk-text"
                    >钻石陶瓷涂层多用锅18cm 小奶锅</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-886 sk-text">149.00</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-688 sk-text"
                    >极光限定 珠光蓝珐琅锅</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-744 sk-text">199.00</text>
                  </view>
                </navigator>
              </view>
            </view>
            <view class="panel panel" id="category-1">
              <view class="title title">
                <text class="name sk-transparent sk-text-26-4706-989 sk-text">收纳</text>
              </view>
              <view class="section section">
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-320 sk-text"
                    >给衣柜减减肥，真空防潮压缩袋</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-932 sk-text">79.00</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-958 sk-text"
                    >爆款明星好物，抽屉式透明储物柜</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-610 sk-text">129.00</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-633 sk-text"
                    >衣柜省空间神器，棉麻涤·收纳挂袋</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-1 sk-text">55.00</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-362 sk-text"
                    >换季好帮手，大容量防尘衣物收纳袋</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-864 sk-text">69.00</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-712 sk-text"
                    >可水洗的布艺收纳盒</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-660 sk-text">29.90</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                  <view class="name ellipsis sk-transparent sk-text-14-2857-357 sk-text"
                    >开发员自留款，带滚轮双层脏衣篓</view
                  >
                  <view class="price price">
                    <text class="symbol sk-transparent sk-opacity">¥</text>
                    <text class="number sk-transparent sk-text-14-2857-303 sk-text">125.00</text>
                  </view>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                </navigator>
                <navigator class="goods goods" hover-class="none">
                  <image class="image sk-image"></image>
                </navigator>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>
<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-506 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-220 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-882 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-424 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-875 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-425 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-270 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-901 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-786 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-911 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-26-4706-943 {
  background-image: linear-gradient(
    transparent 26.4706%,
    #eeeeee 0%,
    #eeeeee 73.5294%,
    transparent 0%
  ) !important;
  background-size: 100% 59.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-750 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-886 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-688 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-744 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-26-4706-989 {
  background-image: linear-gradient(
    transparent 26.4706%,
    #eeeeee 0%,
    #eeeeee 73.5294%,
    transparent 0%
  ) !important;
  background-size: 100% 59.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-320 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-932 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-958 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-610 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-633 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-1 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-362 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-864 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-712 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-660 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-357 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 29.3023rpx;
  position: relative !important;
}
.sk-text-14-2857-303 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
