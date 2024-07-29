"use strict";
const common_vendor = require("../../common/vendor.js");
const services_home = require("../../services/home.js");
const composables_index = require("../../composables/index.js");
require("../../utils/http.js");
require("../../stores/member.js");
if (!Array) {
  const _easycom_XtxSwiper2 = common_vendor.resolveComponent("XtxSwiper");
  const _easycom_XtxGuess2 = common_vendor.resolveComponent("XtxGuess");
  (_easycom_XtxSwiper2 + _easycom_XtxGuess2)();
}
const _easycom_XtxSwiper = () => "../../components/XtxSwiper.js";
const _easycom_XtxGuess = () => "../../components/XtxGuess.js";
if (!Math) {
  (CustomNavBar + _easycom_XtxSwiper + CategoryPanel + HotPanel + _easycom_XtxGuess + PageSkeleton)();
}
const CustomNavBar = () => "./components/CustomNavBar.js";
const CategoryPanel = () => "./components/CategoryPanel.js";
const HotPanel = () => "./components/HotPanel.js";
const PageSkeleton = () => "./components/PageSkeleton.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "90f19098": 88 + common_vendor.unref(Info).statusBarHeight + "px"
    }));
    const Info = common_vendor.index.getSystemInfoSync();
    const bannerList = common_vendor.ref([]);
    const getBannerData = async () => {
      const res = await services_home.getHomeBannerAPI();
      bannerList.value = res.result;
    };
    const categoryList = common_vendor.ref([]);
    const getCategoryData = async () => {
      const res = await services_home.getHomeCategoryAPI();
      categoryList.value = res.result;
    };
    const hotList = common_vendor.ref([]);
    const getHotData = async () => {
      const res = await services_home.getHomeHotItemAPI();
      hotList.value = res.result;
    };
    const isLoading = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      isLoading.value = true;
      await Promise.all([getBannerData(), getCategoryData(), getHotData()]);
      isLoading.value = false;
    });
    const { guessRef, onScrolltolower } = composables_index.useGuessList();
    const isTriggered = common_vendor.ref(false);
    const onRefresherrefresh = async () => {
      var _a, _b;
      isTriggered.value = true;
      (_a = guessRef.value) == null ? void 0 : _a.resetData();
      await Promise.all([getBannerData(), getCategoryData(), getHotData(), (_b = guessRef.value) == null ? void 0 : _b.getMore()]);
      isTriggered.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s(_ctx.__cssVars()),
        b: !isLoading.value
      }, !isLoading.value ? {
        c: common_vendor.p({
          data: bannerList.value
        }),
        d: common_vendor.p({
          categoryList: categoryList.value
        }),
        e: common_vendor.p({
          hotList: hotList.value
        }),
        f: common_vendor.sr(guessRef, "01f9263e-4", {
          "k": "guessRef"
        })
      } : {}, {
        g: common_vendor.o(onRefresherrefresh),
        h: isTriggered.value,
        i: common_vendor.o((...args) => common_vendor.unref(onScrolltolower) && common_vendor.unref(onScrolltolower)(...args)),
        j: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
