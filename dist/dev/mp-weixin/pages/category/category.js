"use strict";
const common_vendor = require("../../common/vendor.js");
const services_home = require("../../services/home.js");
const services_category = require("../../services/category.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_XtxSwiper2 = common_vendor.resolveComponent("XtxSwiper");
  _easycom_XtxSwiper2();
}
const _easycom_XtxSwiper = () => "../../components/XtxSwiper.js";
if (!Math) {
  (_easycom_XtxSwiper + PageSkeleton)();
}
const PageSkeleton = () => "./components/PageSkeleton.js";
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const getBannerList = async () => {
      const res = await services_home.getHomeBannerAPI(2);
      bannerList.value = res.result;
    };
    const categoryTopList = common_vendor.ref([]);
    const getCategoryTopList = async () => {
      const res = await services_category.getCategoryTopAPI();
      categoryTopList.value = res.result;
      console.log(categoryTopList.value[2].children);
    };
    const activeIndex = common_vendor.ref(0);
    const isFinish = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      await Promise.all([getBannerList(), getCategoryTopList()]);
      isFinish.value = true;
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: isFinish.value
      }, isFinish.value ? {
        b: common_vendor.f(categoryTopList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.id,
            c: index === activeIndex.value ? 1 : "",
            d: common_vendor.o(($event) => activeIndex.value = index, item.id)
          };
        }),
        c: common_vendor.p({
          data: bannerList.value
        }),
        d: common_vendor.f((_a = categoryTopList.value[activeIndex.value]) == null ? void 0 : _a.children, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.goods, (goods, k1, i1) => {
              return {
                a: goods.picture,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id,
                e: `/pages/goods/goods?id=${goods.id}`
              };
            }),
            c: item.id
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=category.js.map
