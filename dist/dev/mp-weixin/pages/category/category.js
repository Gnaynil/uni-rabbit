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
    };
    const categoryNumber = common_vendor.computed(
      () => categoryTopList.value.map((item) => {
        return item.children.length;
      })
    );
    const activeIndex = common_vendor.ref(0);
    const subCategoryList = common_vendor.computed(() => {
      return categoryTopList.value.flatMap((item) => item.children);
    });
    const isFinish = common_vendor.ref(false);
    common_vendor.ref(0);
    const categoryHeight = common_vendor.ref([0]);
    const categoryIndex = common_vendor.ref(0);
    const getCategoryHeight = () => {
      common_vendor.nextTick$1(() => {
        const query = common_vendor.index.createSelectorQuery();
        let totalHeight = 0;
        subCategoryList.value.forEach((item, index2) => {
          query.select(`#category-${index2}`).boundingClientRect();
        });
        let index = 0;
        query.exec((res) => {
          res.forEach((rect) => {
            if (rect) {
              totalHeight += rect.height;
              if (index === categoryNumber.value[categoryIndex.value]) {
                console.log(totalHeight);
                categoryIndex.value++;
                index = 0;
                categoryHeight.value.push(totalHeight - 590);
              }
              index++;
            }
          });
        });
      });
    };
    common_vendor.onLoad(async () => {
      await Promise.all([getBannerList(), getCategoryTopList()]);
      isFinish.value = true;
      await getCategoryHeight();
    });
    const scrollToView = common_vendor.ref("");
    const categoryChange = (index) => {
      activeIndex.value = index;
      scrollToView.value = `category-${categoryNumber.value.slice(0, index).reduce((acc, curr) => acc + curr, 0)}`;
    };
    const onScroll = (e) => {
      const scrollTop = e.detail.scrollTop;
      for (let i = 0; i < categoryHeight.value.length; i++) {
        if (scrollTop >= categoryHeight.value[i] && scrollTop < categoryHeight.value[i + 1]) {
          activeIndex.value = i;
          break;
        } else if (i === categoryHeight.value.length - 1 && scrollTop >= categoryHeight.value[i]) {
          activeIndex.value = i;
          break;
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isFinish.value
      }, isFinish.value ? {
        b: common_vendor.f(categoryTopList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.id,
            c: index === activeIndex.value ? 1 : "",
            d: common_vendor.o(($event) => categoryChange(index), item.id)
          };
        }),
        c: common_vendor.p({
          data: bannerList.value
        }),
        d: common_vendor.f(common_vendor.unref(subCategoryList), (item, index, i0) => {
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
            c: item.id,
            d: `category-${index}`
          };
        }),
        e: common_vendor.o(onScroll),
        f: scrollToView.value
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=category.js.map
