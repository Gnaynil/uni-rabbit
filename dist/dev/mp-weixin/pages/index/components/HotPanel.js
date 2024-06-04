"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "HotPanel",
  props: {
    hotList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.hotList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.alt),
            c: item.pictures[0],
            d: item.pictures[1],
            e: `/pages/hot/hot?type=${item.type}`,
            f: item.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/index/components/HotPanel.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=HotPanel.js.map
