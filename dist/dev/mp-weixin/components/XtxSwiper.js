"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "XtxSwiper",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const activeIndex = common_vendor.ref(0);
    const onChange = (ev) => {
      var _a;
      activeIndex.value = (_a = ev.detail) == null ? void 0 : _a.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.data, (item, k0, i0) => {
          return {
            a: item.imgUrl,
            b: item.id
          };
        }),
        b: common_vendor.o(onChange),
        c: common_vendor.f(__props.data, (item, index, i0) => {
          return {
            a: item.id,
            b: index === activeIndex.value ? 1 : ""
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/components/XtxSwiper.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=XtxSwiper.js.map
