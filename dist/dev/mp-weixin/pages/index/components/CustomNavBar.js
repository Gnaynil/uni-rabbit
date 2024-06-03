"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "CustomNavBar",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => {
      var _a;
      return {
        "2f7c5bc6": ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px"
      };
    });
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/index/components/CustomNavBar.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=CustomNavBar.js.map
