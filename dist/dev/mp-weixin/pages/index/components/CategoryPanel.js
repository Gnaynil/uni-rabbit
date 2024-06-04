"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "CategoryPanel",
  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.categoryList, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: item.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/index/components/CategoryPanel.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=CategoryPanel.js.map
