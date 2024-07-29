"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_member = require("../../stores/member.js");
const _sfc_main = {
  __name: "settings",
  setup(__props) {
    const memberStore = stores_member.useMemberStore();
    const logout = () => {
      common_vendor.index.showModal({
        content: "是否退出登录?",
        success: (res) => {
          if (res.confirm) {
            memberStore.clearProfile();
            common_vendor.index.navigateBack();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(memberStore).profile
      }, common_vendor.unref(memberStore).profile ? {} : {}, {
        b: common_vendor.unref(memberStore).profile
      }, common_vendor.unref(memberStore).profile ? {
        c: common_vendor.o(logout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesMember/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=settings.js.map
