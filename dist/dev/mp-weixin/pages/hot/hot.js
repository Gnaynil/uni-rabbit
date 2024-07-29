"use strict";
const common_vendor = require("../../common/vendor.js");
const services_hot = require("../../services/hot.js");
require("../../utils/http.js");
require("../../stores/member.js");
const _sfc_main = {
  __name: "hot",
  props: {
    type: {
      type: String,
      default: () => {
      }
    }
  },
  setup(__props) {
    const query = __props;
    const hotMap = [
      { type: "1", title: "特惠推荐", url: "/hot/preference" },
      { type: "2", title: "爆款推荐", url: "/hot/inVogue" },
      { type: "3", title: "一站买全", url: "/hot/oneStop" },
      { type: "4", title: "新鲜好物", url: "/hot/new" }
    ];
    const currUrlMap = hotMap.find((v) => v.type === query.type);
    common_vendor.index.setNavigationBarTitle({
      title: currUrlMap.title
    });
    const bannerPicture = common_vendor.ref("");
    const subTypes = common_vendor.ref([]);
    const activeIndex = common_vendor.ref(0);
    const getHotList = async () => {
      const res = await services_hot.getHotRecommendAPI(currUrlMap.url, { page: 1, pageSize: 10 });
      bannerPicture.value = res.result.bannerPicture;
      subTypes.value = res.result.subTypes;
    };
    common_vendor.onLoad(() => getHotList());
    const onScrolltolower = async () => {
      const currsubTypes = subTypes.value[activeIndex.value];
      if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
        currsubTypes.goodsItems.page++;
      } else {
        currsubTypes.finish = true;
        return common_vendor.index.showToast({ icon: "none", title: "没有更多数据了~" });
      }
      const res = await services_hot.getHotRecommendAPI(currUrlMap.url, {
        subType: currsubTypes.id,
        page: currsubTypes.goodsItems.page,
        pageSize: currsubTypes.goodsItems.pageSize
      });
      const newsubTypes = res.result.subTypes[activeIndex.value];
      currsubTypes.goodsItems.items = currsubTypes.goodsItems.items.concat(
        ...newsubTypes.goodsItems.items
      );
    };
    return (_ctx, _cache) => {
      return {
        a: bannerPicture.value,
        b: common_vendor.f(subTypes.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: index === activeIndex.value ? 1 : "",
            d: common_vendor.o(() => activeIndex.value = index, item.id)
          };
        }),
        c: common_vendor.f(subTypes.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item.goodsItems.items, (goods, k1, i1) => {
              return {
                a: goods.picture,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id,
                e: `/pages/goods/goods?id=${goods.id}`
              };
            }),
            b: common_vendor.t(item.finish ? "没有更多数据~" : "正在加载..."),
            c: index === activeIndex.value,
            d: item.id,
            e: common_vendor.o(($event) => onScrolltolower(), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/hot/hot.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=hot.js.map
