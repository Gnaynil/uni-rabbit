"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_member = require("../../stores/member.js");
const composables_index = require("../../composables/index.js");
if (!Array) {
  const _easycom_XtxGuess2 = common_vendor.resolveComponent("XtxGuess");
  _easycom_XtxGuess2();
}
const _easycom_XtxGuess = () => "../../components/XtxGuess.js";
if (!Math) {
  _easycom_XtxGuess();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const memberStore = stores_member.useMemberStore();
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const orderTypes = [
      { type: 1, text: "待付款", icon: "icon-currency" },
      { type: 2, text: "待发货", icon: "icon-gift" },
      { type: 3, text: "待收货", icon: "icon-check" },
      { type: 4, text: "待评价", icon: "icon-comment" }
    ];
    const { guessRef, onScrolltolower } = composables_index.useGuessList();
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.unref(memberStore).profile
      }, common_vendor.unref(memberStore).profile ? {
        b: common_vendor.unref(memberStore).profile.avatar,
        c: common_vendor.t(common_vendor.unref(memberStore).profile.nickname || common_vendor.unref(memberStore).profile.account)
      } : {}, {
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        e: common_vendor.f(orderTypes, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.type,
            c: common_vendor.n(item.icon),
            d: `/pagesOrder/list/list?type=${item.type}`
          };
        }),
        f: common_vendor.sr(guessRef, "16eb0998-0", {
          "k": "guessRef"
        }),
        g: common_vendor.o((...args) => common_vendor.unref(onScrolltolower) && common_vendor.unref(onScrolltolower)(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=my.js.map
