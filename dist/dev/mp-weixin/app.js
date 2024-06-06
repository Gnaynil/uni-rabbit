"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
require("./stores/modules/member.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/cart/cart.js";
  "./pages/category/category.js";
  "./pages/login/login.js";
  "./pages/hot/hot.js";
  "./pages/goods/goods.js";
  "./pagesMember/settings/settings.js";
  "./pagesMember/profile/profile.js";
  "./pagesMember/address/address.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    return () => {
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
