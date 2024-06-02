"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomNavBar",
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    console.log(safeAreaInsets);
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_assets._imports_0,
        b: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/index/components/CustomNavBar.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=CustomNavBar.js.map
