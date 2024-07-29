"use strict";
const common_vendor = require("../common/vendor.js");
const services_home = require("../services/home.js");
require("../utils/http.js");
require("../stores/member.js");
const _sfc_main = {
  __name: "XtxGuess",
  setup(__props, { expose }) {
    common_vendor.index.getSystemInfoSync();
    const guessLikeList = common_vendor.ref([]);
    const pageParams = {
      page: 1,
      pageSize: 10
    };
    const finish = common_vendor.ref(false);
    const getHomeGoodsGuessLike = async () => {
      if (finish.value === true) {
        return common_vendor.index.showToast({
          icon: "none",
          title: "没有更多数据了~"
        });
      }
      const res = await services_home.getHomeGoodsGuessLikeAPI(pageParams);
      guessLikeList.value = guessLikeList.value.concat(...res.result.items);
      if (pageParams.page < res.result.pages) {
        pageParams.page++;
      } else {
        finish.value = true;
      }
    };
    const resetData = () => {
      pageParams.page = 1;
      guessLikeList.value = [];
      finish.value = false;
    };
    common_vendor.onMounted(() => getHomeGoodsGuessLike());
    expose({
      resetData,
      // 将getHomeGoodsGuessLike重命名getMore暴露出父组件
      getMore: getHomeGoodsGuessLike
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(guessLikeList.value, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.id,
            e: `/pages/goods/goods?id=${item.id}`
          };
        }),
        b: common_vendor.t(finish.value ? "没有更多数据~" : "正在加载...")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/components/XtxGuess.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=XtxGuess.js.map
