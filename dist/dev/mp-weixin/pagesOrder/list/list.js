"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  OrderList();
}
const OrderList = () => "./components/OrderList.js";
const _sfc_main = {
  __name: "list",
  props: { type: String },
  setup(__props) {
    const query = __props;
    common_vendor.index.getSystemInfoSync();
    const orderTabs = common_vendor.ref([
      { orderState: 0, title: "全部" },
      { orderState: 1, title: "待付款" },
      { orderState: 2, title: "待发货" },
      { orderState: 3, title: "待收货" },
      { orderState: 4, title: "待评价" }
    ]);
    const activeIndex = common_vendor.ref(orderTabs.value.findIndex((v) => v.orderState === Number(query.type)));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orderTabs.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o(() => activeIndex.value = index, item.orderState),
            c: item.orderState
          };
        }),
        b: activeIndex.value * 20 + "%",
        c: common_vendor.f(orderTabs.value, (item, k0, i0) => {
          return {
            a: "2b20f486-0-" + i0,
            b: common_vendor.p({
              orderState: item.orderState
            }),
            c: item.title
          };
        }),
        d: activeIndex.value,
        e: common_vendor.o(($event) => activeIndex.value = $event.detail.current)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesOrder/list/list.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=list.js.map
