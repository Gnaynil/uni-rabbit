"use strict";
const common_vendor = require("../../common/vendor.js");
const services_home = require("../../services/home.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_XtxSwiper2 = common_vendor.resolveComponent("XtxSwiper");
  _easycom_XtxSwiper2();
}
const _easycom_XtxSwiper = () => "../../components/XtxSwiper.js";
if (!Math) {
  (CustomNavBar + _easycom_XtxSwiper)();
}
const CustomNavBar = () => "./components/CustomNavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const banner = common_vendor.ref([]);
    const getData = async () => {
      const res = await services_home.getHomeBannerAPI();
      banner.value = res.result;
    };
    common_vendor.onLoad(getData());
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          data: banner.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
