"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  CartMain();
}
const CartMain = () => "./components/CartMain.js";
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cart.js.map
