"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "AddressPanel",
  props: { address: String },
  emits: ["close", "index"],
  setup(__props, { emit }) {
    const props = __props;
    const onSelected = (index) => {
      props.address.forEach((v) => v.selected = false);
      props.address[index].selected = true;
      emit("close");
      emit("index", index);
    };
    const newAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMember/address/address"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.address, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.receiver),
            b: common_vendor.t(item.contact),
            c: common_vendor.t(item.fullLocation),
            d: common_vendor.t(item.address),
            e: item.selected
          }, item.selected ? {} : {}, {
            f: item.id,
            g: common_vendor.o(($event) => onSelected(index), item.id)
          });
        }),
        b: common_vendor.o(newAddress)
      }, {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/goods/components/AddressPanel.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=AddressPanel.js.map
