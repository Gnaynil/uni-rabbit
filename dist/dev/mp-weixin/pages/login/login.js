"use strict";
const common_vendor = require("../../common/vendor.js");
const services_login = require("../../services/login.js");
const stores_member = require("../../stores/member.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let code = "";
    common_vendor.onLoad(async () => {
      const res = await common_vendor.wx$1.login();
      code = res.code;
    });
    const onGetPhoneNumber = async (ev) => {
      console.log(ev);
      const encryptedData = ev.datail.encryptedData;
      const iv = ev.datail.iv;
      const res = await postLoginWxMinAPI({
        code,
        encryptedData,
        iv
      });
      loginSuccess(res.result);
    };
    const form = common_vendor.ref({
      account: "12056258291",
      password: "hm#qd@23!"
    });
    const doLogin = async () => {
      const res = await services_login.PostLoginAPI({ account: form.value.account, password: form.value.password });
      loginSuccess(res.result);
    };
    const loginSuccess = (profile) => {
      const memberStore = stores_member.useMemberStore();
      memberStore.setProfile(profile);
      common_vendor.index.showToast({
        icon: "none",
        title: "登录成功"
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/my/my"
        });
      }, 500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onGetPhoneNumber),
        b: common_vendor.o(doLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=login.js.map
