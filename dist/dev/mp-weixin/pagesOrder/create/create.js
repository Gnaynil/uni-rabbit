"use strict";
const common_vendor = require("../../common/vendor.js");
const services_order = require("../../services/order.js");
const stores_address = require("../../stores/address.js");
require("../../utils/http.js");
require("../../stores/member.js");
const _sfc_main = {
  __name: "create",
  props: {
    skuId: {
      type: String,
      default: ""
    },
    count: {
      type: String,
      default: ""
    },
    addressId: {
      type: String,
      default: ""
    },
    //再次购买Id
    orderId: {
      type: String
    }
  },
  setup(__props) {
    const query = __props;
    const orderList = common_vendor.ref([]);
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const buyerMessage = common_vendor.ref("");
    const deliveryList = common_vendor.ref([
      { type: 1, text: "时间不限 (周一至周日)" },
      { type: 2, text: "工作日送 (周一至周五)" },
      { type: 3, text: "周末配送 (周六至周日)" }
    ]);
    const activeIndex = common_vendor.ref(0);
    const activeDelivery = common_vendor.computed(() => deliveryList.value[activeIndex.value]);
    const onChangeDelivery = (ev) => {
      activeIndex.value = ev.detail.value;
    };
    console.log(query.orderId);
    const getOrderList = async () => {
      console.log(query.orderId);
      if (query.skuId && query.count) {
        const res = await services_order.getMemberOrderPreNowAPI({
          count: query.count,
          skuId: query.skuId,
          addressId: query.addressId
        });
        orderList.value = res.result;
      } else if (query.orderId) {
        const res = await services_order.getMemberOrderPreAgainAPI(query.orderId);
        orderList.value = res.result;
      } else {
        const res = await services_order.getMemberOrderPreAPI();
        orderList.value = res.result;
      }
    };
    common_vendor.onShow(() => getOrderList());
    common_vendor.onLoad(() => {
      addressStore.selectedAddress = void 0;
    });
    const addressStore = stores_address.useAddressStore();
    const selectedAddress = common_vendor.computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (((_b = (_a = orderList.value) == null ? void 0 : _a.userAddresses) == null ? void 0 : _b.length) === 1) {
        return ((_c = addressStore.selectedAddress) == null ? void 0 : _c.id) ? addressStore.selectedAddress : (_d = orderList.value) == null ? void 0 : _d.userAddresses[0];
      } else {
        return ((_e = addressStore.selectedAddress) == null ? void 0 : _e.id) ? addressStore.selectedAddress : (_g = (_f = orderList.value) == null ? void 0 : _f.userAddresses) == null ? void 0 : _g.find((v) => v.isDefault);
      }
    });
    const onOrderSubmit = async () => {
      if (!selectedAddress.value.id) {
        return common_vendor.index.showToast({
          icon: "none",
          title: "请选择收货地址"
        });
      }
      const res = await services_order.postMemberOrderAPI({
        addressId: selectedAddress.value.id,
        buyerMessage: buyerMessage.value,
        deliveryTimeType: activeDelivery.value.type,
        goods: orderList.value.goods.map((v) => {
          return { count: v.count, skuId: v.skuId };
        }),
        payChannel: 2,
        payType: 1
      });
      common_vendor.index.redirectTo({
        url: `/pagesOrder/detail/detail?id=${res.result.id}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: common_vendor.unref(selectedAddress)
      }, common_vendor.unref(selectedAddress) ? {
        b: common_vendor.t(common_vendor.unref(selectedAddress).receiver),
        c: common_vendor.t(common_vendor.unref(selectedAddress).contact),
        d: common_vendor.t(common_vendor.unref(selectedAddress).fullLocation + " " + common_vendor.unref(selectedAddress).address)
      } : {}, {
        e: common_vendor.f(orderList.value.goods, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.attrsText),
            d: common_vendor.t(item.payPrice),
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.count),
            g: item.id,
            h: `/pages/goods/goods?id=${item.id}`
          };
        }),
        f: common_vendor.t(common_vendor.unref(activeDelivery).text),
        g: deliveryList.value,
        h: common_vendor.o(onChangeDelivery),
        i: buyerMessage.value,
        j: common_vendor.o(($event) => buyerMessage.value = $event.detail.value),
        k: common_vendor.t((_b = (_a = orderList.value) == null ? void 0 : _a.summary) == null ? void 0 : _b.totalPrice.toFixed(2)),
        l: common_vendor.t((_d = (_c = orderList.value) == null ? void 0 : _c.summary) == null ? void 0 : _d.postFee.toFixed(2)),
        m: common_vendor.t((_e = orderList.value.summary) == null ? void 0 : _e.totalPayPrice.toFixed(2)),
        n: ((_f = _ctx.selecteAddress) == null ? void 0 : _f.id) ? 1 : "",
        o: common_vendor.o(onOrderSubmit),
        p: ((_g = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _g.bottom) + "px"
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesOrder/create/create.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=create.js.map
