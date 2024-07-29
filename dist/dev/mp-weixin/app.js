"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/cart/cart.js";
  "./pages/cart/cart2.js";
  "./pages/category/category.js";
  "./pages/login/login.js";
  "./pages/hot/hot.js";
  "./pages/goods/goods.js";
  "./pagesMember/settings/settings.js";
  "./pagesMember/profile/profile.js";
  "./pagesMember/address/address.js";
  "./pagesMember/address-form/address-form.js";
  "./pagesOrder/create/create.js";
  "./pagesOrder/detail/detail.js";
  "./pagesOrder/payment/payment.js";
  "./pagesOrder/list/list.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    return () => {
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/App.vue"]]);
const pinia = common_vendor.createPinia();
pinia.use(common_vendor.src_default);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
